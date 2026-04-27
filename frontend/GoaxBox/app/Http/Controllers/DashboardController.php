<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class DashboardController extends Controller
{
    public function index()
    {
        $base = rtrim(config('services.api.base_url'), '/');
        $token = session('api_token');

        $metrics = [
            'total_booking' => 0,
            'booking_hari_ini' => 0,
            'menunggu_verifikasi' => 0,
            'pendapatan_bulan_ini' => 0,
        ];
        $bookings = [];
        $revenueChart = ['labels' => [], 'data' => []];
        $error = null;

        try {
            $resp = Http::withToken($token)->acceptJson()->timeout(5)->get("{$base}/api/admin/dashboard");
            if ($resp->successful()) {
                $metrics = array_merge($metrics, $resp->json());
            }

            $bResp = Http::withToken($token)->acceptJson()->timeout(5)
                ->get("{$base}/api/admin/bookings");
            $bookings = $bResp->successful() ? $bResp->json('data.data', []) : [];

            $start = now()->subDays(6)->toDateString();
            $end = now()->toDateString();
            $revResp = Http::withToken($token)->acceptJson()->timeout(5)
                ->get("{$base}/api/admin/reports/revenue", [
                    'group_by' => 'day',
                    'start' => $start,
                    'end' => $end,
                ]);

            if ($revResp->successful()) {
                $byDate = [];
                foreach ($revResp->json('breakdown', []) as $row) {
                    $byDate[$row['periode']] = (float) $row['pendapatan'];
                }
                for ($i = 6; $i >= 0; $i--) {
                    $d = now()->subDays($i);
                    $revenueChart['labels'][] = strtoupper($d->format('D'));
                    $revenueChart['data'][] = $byDate[$d->toDateString()] ?? 0;
                }
            }
        } catch (\Throwable $e) {
            $error = 'Gagal terhubung ke backend: '.$e->getMessage();
        }

        return view('dashboard', [
            'metrics' => $metrics,
            'bookings' => $bookings,
            'revenueChart' => $revenueChart,
            'error' => $error,
        ]);
    }
}
