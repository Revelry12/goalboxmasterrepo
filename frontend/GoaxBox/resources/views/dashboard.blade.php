@extends('layouts.admin')

@section('title', 'Dashboard')
@section('header-title', 'Dashboard')

@push('head')
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
@endpush

@section('content')
    @if (! empty($error))
        <div class="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-200 text-sm">
            {{ $error }}
        </div>
    @endif

    {{-- Stats Cards --}}
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {{-- Total Booking --}}
        <div class="stat-card bg-surface-card rounded-2xl p-5 border border-white/5">
            <div class="flex items-start mb-4">
                <div class="w-11 h-11 rounded-xl bg-brand-600/15 flex items-center justify-center">
                    <svg class="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                </div>
            </div>
            <p class="text-gray-400 text-xs font-semibold tracking-wider uppercase mb-1">Total Booking</p>
            <p class="text-3xl font-extrabold text-white">{{ number_format($metrics['total_booking'] ?? 0, 0, ',', '.') }}</p>
        </div>

        {{-- Pendapatan --}}
        <div class="stat-card bg-surface-card rounded-2xl p-5 border border-white/5">
            <div class="flex items-start mb-4">
                <div class="w-11 h-11 rounded-xl bg-emerald-600/15 flex items-center justify-center">
                    <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        stroke-width="2">
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                    </svg>
                </div>
            </div>
            <p class="text-gray-400 text-xs font-semibold tracking-wider uppercase mb-1">Pendapatan Bulan Ini</p>
            <p class="text-3xl font-extrabold text-white">Rp {{ number_format((float) ($metrics['pendapatan_bulan_ini'] ?? 0), 0, ',', '.') }}</p>
        </div>

        {{-- Menunggu Verifikasi --}}
        <div class="stat-card bg-surface-card rounded-2xl p-5 border border-white/5">
            <div class="flex items-start mb-4">
                <div class="w-11 h-11 rounded-xl bg-yellow-600/15 flex items-center justify-center">
                    <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        stroke-width="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12,6 12,12 16,14" />
                    </svg>
                </div>
            </div>
            <p class="text-gray-400 text-xs font-semibold tracking-wider uppercase mb-1">Menunggu Verifikasi</p>
            <p class="text-3xl font-extrabold text-white">{{ $metrics['menunggu_verifikasi'] ?? 0 }}</p>
        </div>

        {{-- Booking Hari Ini --}}
        <div class="stat-card bg-surface-card rounded-2xl p-5 border border-white/5">
            <div class="flex items-start mb-4">
                <div class="w-11 h-11 rounded-xl bg-red-600/15 flex items-center justify-center">
                    <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                </div>
            </div>
            <p class="text-gray-400 text-xs font-semibold tracking-wider uppercase mb-1">Booking Hari Ini</p>
            <p class="text-3xl font-extrabold text-white">{{ $metrics['booking_hari_ini'] ?? 0 }}</p>
        </div>
    </div>

    {{-- Revenue Chart --}}
    <div class="bg-surface-card rounded-2xl p-6 border border-white/5 mb-8">
        <div class="mb-6">
            <h2 class="text-lg font-bold text-white">Pendapatan 7 Hari Terakhir</h2>
            <p class="text-gray-500 text-sm mt-0.5">Total pendapatan harian dari pembayaran lunas</p>
        </div>
        <div class="h-64">
            <canvas id="revenueChart"></canvas>
        </div>
    </div>

    {{-- Recent Bookings Table --}}
    <div class="bg-surface-card rounded-2xl border border-white/5 overflow-hidden">
        <div class="flex items-center justify-between px-6 py-5 border-b border-white/5">
            <h2 class="text-lg font-bold text-white">Booking Terbaru</h2>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead>
                    <tr class="text-gray-500 text-xs font-semibold uppercase tracking-wider border-b border-white/5">
                        <th class="text-left px-6 py-4">Kode</th>
                        <th class="text-left px-4 py-4">User</th>
                        <th class="text-left px-4 py-4">Lapangan</th>
                        <th class="text-left px-4 py-4">Tgl & Jam</th>
                        <th class="text-left px-4 py-4">Total</th>
                        <th class="text-left px-4 py-4">Status</th>
                    </tr>
                </thead>
                <tbody>
                    @php
                        $statusBadge = [
                            'confirmed' => ['label' => 'Terkonfirmasi', 'class' => 'bg-emerald-500/15 text-emerald-300'],
                            'menunggu_verifikasi' => ['label' => 'Menunggu Verifikasi', 'class' => 'bg-yellow-500/15 text-yellow-300'],
                            'pending' => ['label' => 'Pending', 'class' => 'bg-orange-500/15 text-orange-300'],
                            'cancelled' => ['label' => 'Dibatalkan', 'class' => 'bg-red-500/15 text-red-300'],
                            'expired' => ['label' => 'Kedaluwarsa', 'class' => 'bg-gray-500/15 text-gray-300'],
                        ];
                    @endphp
                    @forelse ($bookings as $b)
                        @php
                            $st = $statusBadge[$b['status_booking']] ?? ['label' => $b['status_booking'], 'class' => 'bg-white/10 text-gray-300'];
                            $jamMulai = substr($b['jam_mulai'] ?? '', 0, 5);
                            $jamSelesai = substr($b['jam_selesai'] ?? '', 0, 5);
                        @endphp
                        <tr class="table-row border-b border-white/5 last:border-b-0">
                            <td class="px-6 py-4">
                                <span class="text-brand-400 font-bold text-sm">#{{ $b['kode_booking'] ?? '-' }}</span>
                            </td>
                            <td class="px-4 py-4">
                                <span class="text-white text-sm font-medium">{{ $b['user']['name'] ?? '—' }}</span>
                            </td>
                            <td class="px-4 py-4">
                                <span class="text-gray-300 text-sm">{{ $b['lapangan']['nama'] ?? '—' }}</span>
                            </td>
                            <td class="px-4 py-4">
                                <div class="text-gray-300 text-sm">
                                    {{ \Carbon\Carbon::parse($b['tanggal'])->translatedFormat('d M Y') }}
                                </div>
                                <div class="text-gray-500 text-xs">{{ $jamMulai }} - {{ $jamSelesai }}</div>
                            </td>
                            <td class="px-4 py-4">
                                <span class="text-white text-sm font-semibold">
                                    Rp {{ number_format((float) ($b['total_harga'] ?? 0), 0, ',', '.') }}
                                </span>
                            </td>
                            <td class="px-4 py-4">
                                <span class="text-xs font-bold px-3 py-1.5 rounded-full {{ $st['class'] }}">
                                    {{ strtoupper($st['label']) }}
                                </span>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6" class="px-6 py-10 text-center text-gray-500 text-sm">
                                Belum ada booking.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
@endsection

@push('scripts')
    <script>
        const revenueCtx = document.getElementById('revenueChart').getContext('2d');
        const revenueLabels = @json($revenueChart['labels']);
        const revenueData = @json($revenueChart['data']);
        const rupiahFormatter = new Intl.NumberFormat('id-ID');

        new Chart(revenueCtx, {
            type: 'bar',
            data: {
                labels: revenueLabels,
                datasets: [{
                    data: revenueData,
                    backgroundColor: function (context) {
                        const chart = context.chart;
                        const { ctx, chartArea } = chart;
                        if (!chartArea) return 'rgba(59, 91, 255, 0.6)';
                        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                        gradient.addColorStop(0, 'rgba(59, 91, 255, 0.2)');
                        gradient.addColorStop(1, 'rgba(59, 91, 255, 0.8)');
                        return gradient;
                    },
                    borderColor: 'rgba(59, 91, 255, 1)',
                    borderWidth: 0,
                    borderRadius: 8,
                    borderSkipped: false,
                    barThickness: 32,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#1a2332',
                        titleColor: '#fff',
                        bodyColor: '#9ca3af',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderWidth: 1,
                        cornerRadius: 12,
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            label: (ctx) => 'Rp ' + rupiahFormatter.format(ctx.parsed.y)
                        }
                    }
                },
                scales: {
                    x: {
                        border: { display: false },
                        grid: { display: false },
                        ticks: {
                            color: '#6b7280',
                            font: { size: 11, weight: '600' }
                        }
                    },
                    y: {
                        border: { display: false },
                        grid: {
                            color: 'rgba(255,255,255,0.05)',
                            drawTicks: false,
                        },
                        ticks: {
                            color: '#6b7280',
                            font: { size: 11 },
                            padding: 10,
                            callback: (value) => 'Rp ' + rupiahFormatter.format(value)
                        }
                    }
                }
            }
        });
    </script>
@endpush
