<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Lapangan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LapanganController extends Controller
{
    /**
     * Public listing of active fields for customers.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Lapangan::query()->aktif();

        if ($search = $request->query('q')) {
            $query->where('nama', 'like', "%{$search}%");
        }
        if ($jenis = $request->query('jenis')) {
            $query->where('jenis', $jenis);
        }

        return response()->json([
            'data' => $query->orderBy('nama')->paginate(15),
        ]);
    }

    public function show(Lapangan $lapangan): JsonResponse
    {
        return response()->json(['data' => $lapangan]);
    }

    /**
     * Return booked slots for a given date — used by customers to pick a time.
     */
    public function availability(Request $request, Lapangan $lapangan): JsonResponse
    {
        $data = $request->validate([
            'tanggal' => ['required', 'date_format:Y-m-d'],
        ]);

        $booked = Booking::query()
            ->where('lapangan_id', $lapangan->id)
            ->whereDate('tanggal', $data['tanggal'])
            ->whereIn('status_booking', Booking::ACTIVE_STATUSES)
            ->orderBy('jam_mulai')
            ->get(['jam_mulai', 'jam_selesai', 'status_booking']);

        return response()->json([
            'lapangan' => $lapangan->only(['id', 'nama', 'jam_buka', 'jam_tutup', 'harga_per_jam']),
            'tanggal' => $data['tanggal'],
            'booked' => $booked,
        ]);
    }
}
