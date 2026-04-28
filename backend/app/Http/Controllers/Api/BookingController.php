<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Lapangan;
use App\Models\Payment;
use App\Services\MidtransService;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class BookingController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $status = $request->query('status');
        $search = $request->query('search');

        $query = Booking::query()
            ->with(['lapangan:id,nama,jenis', 'payment'])
            ->where('user_id', $request->user()->id);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('kode_booking', 'like', "%{$search}%")
                  ->orWhereHas('lapangan', function ($qLap) use ($search) {
                      $qLap->where('nama', 'like', "%{$search}%");
                  });
            });
        }

        if ($status && $status !== 'semua') {
            $today = now()->toDateString();
            
            switch ($status) {
                case 'aktif':
                    $query->whereIn('status_booking', [Booking::STATUS_PENDING, Booking::STATUS_MENUNGGU_VERIFIKASI, Booking::STATUS_CONFIRMED])
                          ->whereDate('tanggal', '>=', $today);
                    break;
                case 'selesai':
                    $query->where('status_booking', Booking::STATUS_CONFIRMED)
                          ->whereDate('tanggal', '<', $today);
                    break;
                case 'dibatalkan':
                    $query->whereIn('status_booking', [Booking::STATUS_CANCELLED, Booking::STATUS_EXPIRED]);
                    break;
            }
        }

        $bookings = $query->orderByDesc('id')->paginate(15);

        return response()->json(['data' => $bookings]);
    }

    public function show(Request $request, Booking $booking): JsonResponse
    {
        $this->authorizeOwner($request, $booking);
        $booking->load(['lapangan', 'payment', 'user:id,name,email']);

        return response()->json(['data' => $booking]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'lapangan_id' => ['required', 'integer', 'exists:lapangan,id'],
            'tanggal' => ['required', 'date_format:Y-m-d', 'after_or_equal:today'],
            'jam_mulai' => ['required', 'date_format:H:i'],
            'jam_selesai' => ['required', 'date_format:H:i', 'after:jam_mulai'],
            'metode' => ['required', 'in:transfer_manual,midtrans'],
            'catatan' => ['nullable', 'string', 'max:500'],
        ]);

        return DB::transaction(function () use ($data, $request) {
            /** @var Lapangan $lapangan */
            $lapangan = Lapangan::where('id', $data['lapangan_id'])
                ->lockForUpdate()
                ->firstOrFail();

            if ($lapangan->status !== Lapangan::STATUS_AKTIF) {
                throw ValidationException::withMessages([
                    'lapangan_id' => ['Lapangan sedang tidak tersedia.'],
                ]);
            }

            $start = Carbon::createFromFormat('H:i', $data['jam_mulai']);
            $end = Carbon::createFromFormat('H:i', $data['jam_selesai']);
            $buka = Carbon::createFromFormat('H:i:s', $lapangan->jam_buka);
            $tutup = Carbon::createFromFormat('H:i:s', $lapangan->jam_tutup);

            if ($start->lt($buka) || $end->gt($tutup)) {
                throw ValidationException::withMessages([
                    'jam_mulai' => ["Di luar jam operasional ({$lapangan->jam_buka} - {$lapangan->jam_tutup})."],
                ]);
            }

            $durasiMinutes = abs($end->diffInMinutes($start));
            if ($durasiMinutes < 60 || $durasiMinutes % 60 !== 0) {
                throw ValidationException::withMessages([
                    'jam_selesai' => ['Durasi minimal 1 jam dan harus kelipatan 1 jam.'],
                ]);
            }
            $durasiJam = intdiv($durasiMinutes, 60);

            // Conflict detection — overlapping range with active booking on same lapangan/date.
            $conflict = Booking::query()
                ->where('lapangan_id', $lapangan->id)
                ->whereDate('tanggal', $data['tanggal'])
                ->whereIn('status_booking', Booking::ACTIVE_STATUSES)
                ->where(function ($q) use ($data) {
                    $q->where('jam_mulai', '<', $data['jam_selesai'])
                      ->where('jam_selesai', '>', $data['jam_mulai']);
                })
                ->lockForUpdate()
                ->exists();

            if ($conflict) {
                throw ValidationException::withMessages([
                    'jam_mulai' => ['Jadwal bentrok — slot waktu sudah dipesan.'],
                ]);
            }

            $total = $lapangan->harga_per_jam * $durasiJam;

            $booking = Booking::create([
                'kode_booking' => 'BK-'.strtoupper(Str::random(10)),
                'user_id' => $request->user()->id,
                'lapangan_id' => $lapangan->id,
                'tanggal' => $data['tanggal'],
                'jam_mulai' => $data['jam_mulai'],
                'jam_selesai' => $data['jam_selesai'],
                'durasi_jam' => $durasiJam,
                'total_harga' => $total,
                'status_booking' => Booking::STATUS_PENDING,
                'catatan' => $data['catatan'] ?? null,
            ]);

            $payment = Payment::create([
                'booking_id' => $booking->id,
                'metode' => $data['metode'],
                'nominal' => $total,
                'status_bayar' => Payment::STATUS_PENDING,
                'order_id' => $booking->kode_booking.'-'.time(),
                'expired_at' => now()->addHours(2),
            ]);

            $response = [
                'message' => 'Booking berhasil dibuat. Silakan lakukan pembayaran.',
                'booking' => $booking->fresh(['lapangan', 'payment']),
            ];

            if ($data['metode'] === Payment::METODE_MIDTRANS) {
                try {
                    $midtrans = app(MidtransService::class);
                    $snap = $midtrans->createSnapToken($booking, $payment);
                    $payment->update(['snap_token' => $snap]);
                    $response['snap_token'] = $snap;
                    $response['client_key'] = config('midtrans.client_key');
                } catch (\Throwable $e) {
                    $response['midtrans_error'] = $e->getMessage();
                }
            }

            return response()->json($response, 201);
        });
    }

    public function cancel(Request $request, Booking $booking): JsonResponse
    {
        $this->authorizeOwner($request, $booking);

        if (! in_array($booking->status_booking, [Booking::STATUS_PENDING, Booking::STATUS_MENUNGGU_VERIFIKASI], true)) {
            throw ValidationException::withMessages([
                'status_booking' => ['Booking tidak dapat dibatalkan pada status ini.'],
            ]);
        }

        $booking->update(['status_booking' => Booking::STATUS_CANCELLED]);
        if ($booking->payment) {
            $booking->payment->update(['status_bayar' => Payment::STATUS_FAILED]);
        }

        return response()->json(['message' => 'Booking dibatalkan', 'data' => $booking->fresh('payment')]);
    }

    protected function authorizeOwner(Request $request, Booking $booking): void
    {
        if ($booking->user_id !== $request->user()->id && ! $request->user()->isAdmin()) {
            abort(403, 'Forbidden.');
        }
    }
}
