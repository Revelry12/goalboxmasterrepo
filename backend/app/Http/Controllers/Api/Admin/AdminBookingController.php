<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Payment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AdminBookingController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Booking::query()->with(['user:id,name,email', 'lapangan:id,nama', 'payment']);

        if ($status = $request->query('status')) {
            $query->where('status_booking', $status);
        }
        if ($lapanganId = $request->query('lapangan_id')) {
            $query->where('lapangan_id', $lapanganId);
        }
        if ($tanggal = $request->query('tanggal')) {
            $query->whereDate('tanggal', $tanggal);
        }

        return response()->json(['data' => $query->orderByDesc('id')->paginate(20)]);
    }

    public function show(Booking $booking): JsonResponse
    {
        return response()->json(['data' => $booking->load(['user', 'lapangan', 'payment'])]);
    }

    public function verify(Request $request, Booking $booking): JsonResponse
    {
        $data = $request->validate([
            'keputusan' => ['required', 'in:approve,reject'],
            'catatan' => ['nullable', 'string', 'max:500'],
        ]);

        if ($data['keputusan'] === 'approve') {
            $booking->update(['status_booking' => Booking::STATUS_CONFIRMED]);
            if ($booking->payment) {
                $booking->payment->update([
                    'status_bayar' => Payment::STATUS_PAID,
                    'paid_at' => now(),
                ]);
            }
        } else {
            $booking->update([
                'status_booking' => Booking::STATUS_CANCELLED,
                'catatan' => $data['catatan'] ?? $booking->catatan,
            ]);
            if ($booking->payment) {
                $booking->payment->update(['status_bayar' => Payment::STATUS_FAILED]);
            }
        }

        return response()->json(['message' => 'Verifikasi selesai', 'data' => $booking->fresh('payment')]);
    }

    public function verifyPayment(Request $request, Payment $payment): JsonResponse
    {
        $data = $request->validate([
            'keputusan' => ['required', 'in:approve,reject'],
        ]);

        if (! in_array($payment->status_bayar, [Payment::STATUS_MENUNGGU_VERIFIKASI, Payment::STATUS_PENDING], true)) {
            throw ValidationException::withMessages([
                'status_bayar' => ['Pembayaran tidak dalam status yang dapat diverifikasi.'],
            ]);
        }

        if ($data['keputusan'] === 'approve') {
            $payment->update([
                'status_bayar' => Payment::STATUS_PAID,
                'paid_at' => now(),
            ]);
            $payment->booking->update(['status_booking' => Booking::STATUS_CONFIRMED]);
        } else {
            $payment->update(['status_bayar' => Payment::STATUS_FAILED]);
            $payment->booking->update(['status_booking' => Booking::STATUS_CANCELLED]);
        }

        return response()->json(['message' => 'Verifikasi pembayaran selesai', 'data' => $payment->fresh('booking')]);
    }
}
