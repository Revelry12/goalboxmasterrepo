@extends('layouts.app')

@section('meta_description', 'GoalBox Admin Dashboard - Kelola lapangan futsal Anda')
@section('title', 'Dashboard - GoalBox Admin')

@section('head_scripts')
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
@endsection

@section('body_class', 'bg-surface-dark font-sans antialiased text-white min-h-screen')

@section('content')
    <div class="flex min-h-screen">

        {{-- ===== SIDEBAR ===== --}}
        <aside id="sidebar"
            class="sidebar-gradient w-64 fixed left-0 top-0 bottom-0 z-40 flex flex-col border-r border-white/5 transition-transform duration-300 lg:translate-x-0 -translate-x-full">
            {{-- Logo --}}
            <div class="px-6 py-6 border-b border-white/5">
                <a href="/dashboard" class="flex items-center gap-3">
                    <div class="w-10 h-10">
                        <img src="{{ asset('icon.svg') }}" alt="Hero Image" class="w-full h-full object-cover">
                    </div>
                    <div>
                        <span class="text-white text-lg font-bold tracking-tight block">GoalBox</span>
                        <span class="text-gray-500 text-[10px] font-medium tracking-widest uppercase">Admin Panel</span>
                    </div>
                </a>
            </div>

            {{-- Navigation --}}
            <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                <a href="#"
                    class="sidebar-item active flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white">
                    <svg class="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        stroke-width="2">
                        <rect x="3" y="3" width="7" height="7" rx="1" />
                        <rect x="14" y="3" width="7" height="7" rx="1" />
                        <rect x="3" y="14" width="7" height="7" rx="1" />
                        <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                    Dashboard
                </a>
                <a href="#"
                    class="sidebar-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M3 9h18M9 21V9" />
                    </svg>
                    Kelola Lapangan
                </a>
                <a href="#"
                    class="sidebar-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Kelola Booking
                </a>
                <a href="#"
                    class="sidebar-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                        <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                    Pembayaran
                </a>
                <a href="#"
                    class="sidebar-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white relative">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
                        <polyline points="17,6 23,6 23,12" />
                    </svg>
                    Refund
                    <span
                        class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center">3</span>
                </a>
                <a href="#"
                    class="sidebar-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                        <polyline points="14,2 14,8 20,8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10,9 9,9 8,9" />
                    </svg>
                    Laporan
                </a>
                <a href="#"
                    class="sidebar-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 01-3.46 0" />
                    </svg>
                    Notifikasi
                </a>
                <a href="#"
                    class="sidebar-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <circle cx="12" cy="12" r="3" />
                        <path
                            d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                    </svg>
                    Pengaturan
                </a>
            </nav>

            {{-- Logout --}}
            <div class="px-4 py-5 border-t border-white/5">
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit"
                        class="sidebar-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 w-full transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                            <polyline points="16,17 21,12 16,7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Logout
                    </button>
                </form>
            </div>
        </aside>

        {{-- ===== MAIN CONTENT ===== --}}
        <main class="flex-1 lg:ml-64">
            {{-- Top Header --}}
            <header class="sticky top-0 z-30 bg-surface-dark/80 backdrop-blur-xl border-b border-white/5">
                <div class="flex items-center justify-between px-6 lg:px-8 h-16">
                    <div class="flex items-center gap-4">
                        {{-- Mobile menu toggle --}}
                        <button id="sidebarToggle" class="lg:hidden text-gray-400 hover:text-white transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <h1 class="text-xl font-bold text-white">Dashboard</h1>
                    </div>

                    {{-- Search & Profile --}}
                    <div class="flex items-center gap-4">
                        <div
                            class="hidden md:flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 w-64">
                            <svg class="w-4 h-4 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                stroke-width="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                            </svg>
                            <input type="text" placeholder="Cari data..."
                                class="bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none w-full">
                        </div>

                        {{-- Notification Bell --}}
                        <button class="relative text-gray-400 hover:text-white transition-colors p-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 01-3.46 0" />
                            </svg>
                            <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {{-- Profile --}}
                        <div class="flex items-center gap-3 pl-4 border-l border-white/10">
                            <div class="text-right hidden sm:block">
                                <p class="text-sm font-semibold text-white">{{ session('user.name', 'Admin Utama') }}
                                </p>
                                <p class="text-xs text-gray-500">{{ session('user.role', 'Super Admin') }}</p>
                            </div>
                            <div
                                class="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                {{ strtoupper(substr(session('user.name', 'A'), 0, 1)) }}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {{-- Dashboard Content --}}
            <div class="p-6 lg:p-8">
                {{-- Stats Cards --}}
                <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
                    {{-- Total Booking --}}
                    <div class="stat-card bg-surface-card rounded-2xl p-5 border border-white/5">
                        <div class="flex items-start justify-between mb-4">
                            <div class="w-11 h-11 rounded-xl bg-brand-600/15 flex items-center justify-center">
                                <svg class="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    stroke-width="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                            </div>
                            <span
                                class="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">+12%</span>
                        </div>
                        <p class="text-gray-400 text-xs font-semibold tracking-wider uppercase mb-1">Total Booking</p>
                        <p class="text-3xl font-extrabold text-white">1,284</p>
                    </div>

                    {{-- Pendapatan --}}
                    <div class="stat-card bg-surface-card rounded-2xl p-5 border border-white/5">
                        <div class="flex items-start justify-between mb-4">
                            <div class="w-11 h-11 rounded-xl bg-emerald-600/15 flex items-center justify-center">
                                <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    stroke-width="2">
                                    <line x1="12" y1="1" x2="12" y2="23" />
                                    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                                </svg>
                            </div>
                            <span
                                class="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">+8%</span>
                        </div>
                        <p class="text-gray-400 text-xs font-semibold tracking-wider uppercase mb-1">Pendapatan</p>
                        <p class="text-3xl font-extrabold text-white">Rp 42.5M</p>
                    </div>

                    {{-- Booking Menunggu --}}
                    <div class="stat-card bg-surface-card rounded-2xl p-5 border border-white/5">
                        <div class="flex items-start justify-between mb-4">
                            <div class="w-11 h-11 rounded-xl bg-yellow-600/15 flex items-center justify-center">
                                <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    stroke-width="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12,6 12,12 16,14" />
                                </svg>
                            </div>
                            <span class="badge-high text-[10px] font-bold px-2.5 py-1 rounded-full">High</span>
                        </div>
                        <p class="text-gray-400 text-xs font-semibold tracking-wider uppercase mb-1">Booking Menunggu
                        </p>
                        <p class="text-3xl font-extrabold text-white">24</p>
                    </div>

                    {{-- Refund Menunggu --}}
                    <div class="stat-card bg-surface-card rounded-2xl p-5 border border-white/5">
                        <div class="flex items-start justify-between mb-4">
                            <div class="w-11 h-11 rounded-xl bg-red-600/15 flex items-center justify-center">
                                <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    stroke-width="2">
                                    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
                                    <polyline points="17,6 23,6 23,12" />
                                </svg>
                            </div>
                            <span class="badge-urgent text-[10px] font-bold px-2.5 py-1 rounded-full">Urgent</span>
                        </div>
                        <p class="text-gray-400 text-xs font-semibold tracking-wider uppercase mb-1">Refund Menunggu</p>
                        <p class="text-3xl font-extrabold text-white">3</p>
                    </div>
                </div>

                {{-- Charts Row --}}
                <div class="grid xl:grid-cols-3 gap-5 mb-8">
                    {{-- Revenue Chart --}}
                    <div class="xl:col-span-2 bg-surface-card rounded-2xl p-6 border border-white/5">
                        <div class="flex items-center justify-between mb-6">
                            <div>
                                <h2 class="text-lg font-bold text-white">Pendapatan 7 Hari Terakhir</h2>
                                <p class="text-gray-500 text-sm mt-0.5">Statistik harian pendapatan lapangan</p>
                            </div>
                            <select
                                class="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-brand-500 transition-colors">
                                <option>Minggu ini</option>
                                <option>Bulan ini</option>
                                <option>3 Bulan</option>
                            </select>
                        </div>
                        <div class="h-64">
                            <canvas id="revenueChart"></canvas>
                        </div>
                    </div>

                    {{-- Booking Status Donut --}}
                    <div class="bg-surface-card rounded-2xl p-6 border border-white/5">
                        <div class="mb-6">
                            <h2 class="text-lg font-bold text-white">Status Booking</h2>
                            <p class="text-gray-500 text-sm mt-0.5">Distribusi reservasi</p>
                        </div>
                        <div class="flex justify-center mb-6">
                            <div class="relative">
                                <canvas id="statusChart" width="180" height="180"></canvas>
                                <div class="absolute inset-0 flex items-center justify-center flex-col">
                                    <p class="text-2xl font-extrabold text-white">1.2K</p>
                                    <p class="text-gray-500 text-xs font-medium">TOTAL</p>
                                </div>
                            </div>
                        </div>
                        <div class="space-y-3">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2.5">
                                    <span class="w-3 h-3 rounded-full bg-emerald-400"></span>
                                    <span class="text-gray-300 text-sm">Selesai</span>
                                </div>
                                <span class="text-white font-bold text-sm">65%</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2.5">
                                    <span class="w-3 h-3 rounded-full bg-yellow-400"></span>
                                    <span class="text-gray-300 text-sm">Menunggu</span>
                                </div>
                                <span class="text-white font-bold text-sm">25%</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2.5">
                                    <span class="w-3 h-3 rounded-full bg-red-400"></span>
                                    <span class="text-gray-300 text-sm">Dibatalkan</span>
                                </div>
                                <span class="text-white font-bold text-sm">10%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {{-- Bottom Row --}}
                <div class="grid xl:grid-cols-3 gap-5">
                    {{-- Recent Bookings Table --}}
                    <div class="xl:col-span-2 bg-surface-card rounded-2xl border border-white/5 overflow-hidden">
                        <div class="flex items-center justify-between px-6 py-5 border-b border-white/5">
                            <h2 class="text-lg font-bold text-white">Booking Terbaru</h2>
                            <a href="#"
                                class="text-brand-400 text-sm font-medium hover:text-brand-300 transition-colors">Lihat
                                Semua</a>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-full">
                                <thead>
                                    <tr
                                        class="text-gray-500 text-xs font-semibold uppercase tracking-wider border-b border-white/5">
                                        <th class="text-left px-6 py-4">Kode</th>
                                        <th class="text-left px-4 py-4">User</th>
                                        <th class="text-left px-4 py-4">Lapangan</th>
                                        <th class="text-left px-4 py-4">Tgl & Jam</th>
                                        <th class="text-left px-4 py-4">Total</th>
                                        <th class="text-left px-4 py-4">Status</th>
                                        <th class="text-center px-4 py-4">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="table-row border-b border-white/5">
                                        <td class="px-6 py-4">
                                            <span class="text-brand-400 font-bold text-sm">#GB-9821</span>
                                        </td>
                                        <td class="px-4 py-4">
                                            <span class="text-white text-sm font-medium">Budi Santoso</span>
                                        </td>
                                        <td class="px-4 py-4">
                                            <span class="text-gray-300 text-sm">Arena A</span>
                                        </td>
                                        <td class="px-4 py-4">
                                            <div class="text-gray-300 text-sm">12 Oct 2023</div>
                                            <div class="text-gray-500 text-xs">19:00 - 21:00</div>
                                        </td>
                                        <td class="px-4 py-4">
                                            <span class="text-white text-sm font-semibold">Rp 350rb</span>
                                        </td>
                                        <td class="px-4 py-4">
                                            <span
                                                class="badge-lunas text-xs font-bold px-3 py-1.5 rounded-full">LUNAS</span>
                                        </td>
                                        <td class="px-4 py-4 text-center">
                                            <button
                                                class="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                    stroke-width="2">
                                                    <circle cx="12" cy="12" r="1" />
                                                    <circle cx="12" cy="5" r="1" />
                                                    <circle cx="12" cy="19" r="1" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr class="table-row border-b border-white/5">
                                        <td class="px-6 py-4">
                                            <span class="text-brand-400 font-bold text-sm">#GB-9820</span>
                                        </td>
                                        <td class="px-4 py-4">
                                            <span class="text-white text-sm font-medium">Andi Wijaya</span>
                                        </td>
                                        <td class="px-4 py-4">
                                            <span class="text-gray-300 text-sm">Arena B</span>
                                        </td>
                                        <td class="px-4 py-4">
                                            <div class="text-gray-300 text-sm">12 Oct 2023</div>
                                            <div class="text-gray-500 text-xs">20:00 - 22:00</div>
                                        </td>
                                        <td class="px-4 py-4">
                                            <span class="text-white text-sm font-semibold">Rp 280rb</span>
                                        </td>
                                        <td class="px-4 py-4">
                                            <span
                                                class="badge-pending text-xs font-bold px-3 py-1.5 rounded-full">PENDING</span>
                                        </td>
                                        <td class="px-4 py-4 text-center">
                                            <button
                                                class="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                    stroke-width="2">
                                                    <circle cx="12" cy="12" r="1" />
                                                    <circle cx="12" cy="5" r="1" />
                                                    <circle cx="12" cy="19" r="1" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr class="table-row">
                                        <td class="px-6 py-4">
                                            <span class="text-brand-400 font-bold text-sm">#GB-9819</span>
                                        </td>
                                        <td class="px-4 py-4">
                                            <span class="text-white text-sm font-medium">Citra Lestari</span>
                                        </td>
                                        <td class="px-4 py-4">
                                            <span class="text-gray-300 text-sm">Vip Arena</span>
                                        </td>
                                        <td class="px-4 py-4">
                                            <div class="text-gray-300 text-sm">13 Oct 2023</div>
                                            <div class="text-gray-500 text-xs">10:00 - 12:00</div>
                                        </td>
                                        <td class="px-4 py-4">
                                            <span class="text-white text-sm font-semibold">Rp 450rb</span>
                                        </td>
                                        <td class="px-4 py-4">
                                            <span
                                                class="badge-lunas text-xs font-bold px-3 py-1.5 rounded-full">LUNAS</span>
                                        </td>
                                        <td class="px-4 py-4 text-center">
                                            <button
                                                class="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                    stroke-width="2">
                                                    <circle cx="12" cy="12" r="1" />
                                                    <circle cx="12" cy="5" r="1" />
                                                    <circle cx="12" cy="19" r="1" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {{-- Refund Requests --}}
                    <div class="bg-surface-card rounded-2xl border border-white/5 overflow-hidden">
                        <div class="flex items-center justify-between px-6 py-5 border-b border-white/5">
                            <h2 class="text-lg font-bold text-white">Refund Menunggu</h2>
                            <span class="text-xs font-bold text-red-400 bg-red-400/10 px-3 py-1.5 rounded-full">3
                                TOTAL</span>
                        </div>
                        <div class="p-4 space-y-3 max-h-[480px] overflow-y-auto">
                            {{-- Refund Card 1 --}}
                            <div class="refund-card bg-white/3 rounded-xl p-4 border border-white/5">
                                <div class="flex items-center gap-3 mb-3">
                                    <div
                                        class="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                        F</div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-white font-semibold text-sm truncate">Faisal Rahman</p>
                                        <p class="text-gray-500 text-xs">#GB-9715 • Rp 150.000</p>
                                    </div>
                                </div>
                                <p class="text-gray-400 text-xs leading-relaxed mb-4 italic">"Hujan badai di area
                                    lapangan, akses jalan terputus. Mohon refund dana."</p>
                                <div class="flex gap-2">
                                    <button
                                        class="flex-1 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors">PROSES</button>
                                    <button
                                        class="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold py-2.5 rounded-lg border border-white/10 transition-colors">TOLAK</button>
                                </div>
                            </div>

                            {{-- Refund Card 2 --}}
                            <div class="refund-card bg-white/3 rounded-xl p-4 border border-white/5">
                                <div class="flex items-center gap-3 mb-3">
                                    <div
                                        class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                        S</div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-white font-semibold text-sm truncate">Siska Olivia</p>
                                        <p class="text-gray-500 text-xs">#GB-9760 • Rp 200.000</p>
                                    </div>
                                </div>
                                <p class="text-gray-400 text-xs leading-relaxed mb-4 italic">"Ada kendala teknis dari
                                    tim kami, pemain cedera mendadak."</p>
                                <div class="flex gap-2">
                                    <button
                                        class="flex-1 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors">PROSES</button>
                                    <button
                                        class="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold py-2.5 rounded-lg border border-white/10 transition-colors">TOLAK</button>
                                </div>
                            </div>

                            {{-- Refund Card 3 --}}
                            <div class="refund-card bg-white/3 rounded-xl p-4 border border-white/5">
                                <div class="flex items-center gap-3 mb-3">
                                    <div
                                        class="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                        R</div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-white font-semibold text-sm truncate">Roni Setiawan</p>
                                        <p class="text-gray-500 text-xs">#GB-9762 • Rp 150.000</p>
                                    </div>
                                </div>
                                <p class="text-gray-400 text-xs leading-relaxed mb-4 italic">"Salah memilih jam booking,
                                    harusnya malam hari."</p>
                                <div class="flex gap-2">
                                    <button
                                        class="flex-1 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors">PROSES</button>
                                    <button
                                        class="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold py-2.5 rounded-lg border border-white/10 transition-colors">TOLAK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    {{-- Sidebar Overlay (mobile) --}}
    <div id="sidebarOverlay" class="fixed inset-0 bg-black/60 z-30 hidden lg:hidden" onclick="closeSidebar()"></div>

@endsection

@section('scripts')
    <script>
        // Sidebar toggle
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');

        document.getElementById('sidebarToggle').addEventListener('click', () => {
            sidebar.classList.remove('-translate-x-full');
            overlay.classList.remove('hidden');
        });

        function closeSidebar() {
            sidebar.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
        }

        // Revenue Chart
        const revenueCtx = document.getElementById('revenueChart').getContext('2d');
        const revenueGradient = revenueCtx.createLinearGradient(0, 0, 0, 250);
        revenueGradient.addColorStop(0, 'rgba(59, 91, 255, 0.3)');
        revenueGradient.addColorStop(1, 'rgba(59, 91, 255, 0)');

        new Chart(revenueCtx, {
            type: 'bar',
            data: {
                labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
                datasets: [{
                    data: [5.2, 7.8, 4.5, 6.0, 8.5, 9.1, 6.8],
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
                            label: function (context) {
                                return 'Rp ' + context.parsed.y + ' M';
                            }
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
                            callback: function (value) {
                                return 'Rp ' + value + 'M';
                            }
                        }
                    }
                }
            }
        });

        // Status Donut Chart
        const statusCtx = document.getElementById('statusChart').getContext('2d');
        new Chart(statusCtx, {
            type: 'doughnut',
            data: {
                labels: ['Selesai', 'Menunggu', 'Dibatalkan'],
                datasets: [{
                    data: [65, 25, 10],
                    backgroundColor: [
                        '#34d399',
                        '#fbbf24',
                        '#f87171'
                    ],
                    borderColor: '#1a2332',
                    borderWidth: 4,
                    hoverBorderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                cutout: '70%',
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
                        callbacks: {
                            label: function (context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    </script>
@endsection