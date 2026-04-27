<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class LapanganController extends Controller
{
    public function landing()
    {
        $lapangan = [];

        try {
            $response = Http::acceptJson()
                ->timeout(5)
                ->get(rtrim(config('services.api.base_url'), '/').'/api/lapangan');

            if ($response->successful()) {
                $lapangan = $response->json('data.data', []);
            }
        } catch (\Throwable $e) {
            // Backend down — render landing with empty list rather than 500.
            $lapangan = [];
        }

        return view('landing', ['lapangan' => $lapangan]);
    }
}
