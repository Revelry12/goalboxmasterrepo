<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Payment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminReportController extends Controller
{
    public function revenue(Request $request): JsonResponse
    {
        $data = $request->validate([
            'start' => ['nullable', 'date_format:Y-m-d'],
            'end' => ['nullable', 'date_format:Y-m-d', 'after_or_equal:start'],
            'group_by' => ['nullable', 'in:day,month,lapangan'],
        ]);

        $start = $data['start'] ?? now()->subDays(30)->toDateString();
        $end = $data['end'] ?? now()->toDateString();
        $groupBy = $data['group_by'] ?? 'day';

        $base = Payment::query()
            ->where('status_bayar', Payment::STATUS_PAID)
            ->whereBetween('paid_at', [$start.' 00:00:00', $end.' 23:59:59']);

        $summary = (clone $base)
            ->selectRaw('COUNT(*) as total_transaksi, COALESCE(SUM(nominal), 0) as total_pendapatan')
            ->first();

        $breakdown = match ($groupBy) {
            'month' => (clone $base)
                ->selectRaw("strftime('%Y-%m', paid_at) as periode, COUNT(*) as jumlah, SUM(nominal) as pendapatan")
                ->groupBy('periode')
                ->orderBy('periode')
                ->get(),
            'lapangan' => (clone $base)
                ->join('bookings', 'bookings.id', '=', 'payments.booking_id')
                ->join('lapangan', 'lapangan.id', '=', 'bookings.lapangan_id')
                ->selectRaw('lapangan.id, lapangan.nama, COUNT(payments.id) as jumlah, SUM(payments.nominal) as pendapatan')
                ->groupBy('lapangan.id', 'lapangan.nama')
                ->orderByDesc('pendapatan')
                ->get(),
            default => (clone $base)
                ->selectRaw("strftime('%Y-%m-%d', paid_at) as periode, COUNT(*) as jumlah, SUM(nominal) as pendapatan")
                ->groupBy('periode')
                ->orderBy('periode')
                ->get(),
        };

        return response()->json([
            'periode' => ['start' => $start, 'end' => $end, 'group_by' => $groupBy],
            'summary' => $summary,
            'breakdown' => $breakdown,
        ]);
    }

    public function dashboard(): JsonResponse
    {
        return response()->json([
            'total_booking' => Booking::count(),
            'booking_hari_ini' => Booking::whereDate('tanggal', today())->count(),
            'menunggu_verifikasi' => Booking::where('status_booking', Booking::STATUS_MENUNGGU_VERIFIKASI)->count(),
            'pendapatan_bulan_ini' => (float) Payment::where('status_bayar', Payment::STATUS_PAID)
                ->whereYear('paid_at', now()->year)
                ->whereMonth('paid_at', now()->month)
                ->sum('nominal'),
        ]);
    }
}
