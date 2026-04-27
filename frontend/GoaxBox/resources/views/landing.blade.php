<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description"
        content="GoalBox - Platform booking lapangan futsal premium. Pesan lapangan futsal kapan saja dengan mudah dan cepat.">
    <title>GoalBox - Booking Lapangan Futsal Premium</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="bg-white font-sans antialiased">

    {{-- ===== NAVBAR ===== --}}
    <nav id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="flex items-center justify-between h-18">
                {{-- Logo --}}
                <a href="/" class="flex items-center gap-2.5">
                    <img src="{{ asset('Icon.svg') }}" alt="Hero Image" class="w-full h-full object-cover">
                    <span class="text-white text-lg font-bold tracking-tight">GoalBox</span>
                </a>

                {{-- Desktop Nav Links --}}
                <div class="hidden md:flex items-center gap-8">
                    <a href="#beranda"
                        class="text-gray-300 hover:text-white transition-colors text-sm font-medium">Beranda</a>
                    <a href="#lapangan"
                        class="text-gray-300 hover:text-white transition-colors text-sm font-medium">Lapangan</a>
                    <a href="#cara-pesan"
                        class="text-gray-300 hover:text-white transition-colors text-sm font-medium">Cara Pesan</a>
                    <a href="#tentang"
                        class="text-gray-300 hover:text-white transition-colors text-sm font-medium">Tentang Kami</a>
                </div>

                {{-- Auth Buttons --}}
                <div class="hidden md:flex items-center gap-3">
                    <a href="/login"
                        class="text-gray-300 hover:text-white transition-colors text-sm font-medium px-4 py-2">Masuk</a>
                    <a href="#"
                        class="bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all hover:shadow-lg hover:shadow-brand-600/25">Daftar</a>
                </div>

                {{-- Mobile Menu Button --}}
                <button id="mobileMenuBtn" class="md:hidden text-white p-2">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </div>

        {{-- Mobile Menu --}}
        <div id="mobileMenu" class="hidden md:hidden bg-navy-900/95 backdrop-blur-xl border-t border-white/10">
            <div class="px-6 py-4 space-y-3">
                <a href="#beranda"
                    class="block text-gray-300 hover:text-white transition-colors text-sm font-medium py-2">Beranda</a>
                <a href="#lapangan"
                    class="block text-gray-300 hover:text-white transition-colors text-sm font-medium py-2">Lapangan</a>
                <a href="#cara-pesan"
                    class="block text-gray-300 hover:text-white transition-colors text-sm font-medium py-2">Cara
                    Pesan</a>
                <a href="#tentang"
                    class="block text-gray-300 hover:text-white transition-colors text-sm font-medium py-2">Tentang
                    Kami</a>
                <hr class="border-white/10">
                <a href="/login"
                    class="block text-gray-300 hover:text-white transition-colors text-sm font-medium py-2">Masuk</a>
                <a href="#"
                    class="block bg-brand-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg text-center">Daftar</a>
            </div>
        </div>
    </nav>

    {{-- ===== HERO SECTION ===== --}}
    <section id="beranda" class="hero-gradient relative min-h-[700px] flex items-center overflow-hidden">
        {{-- Background Effects --}}
        <div class="absolute inset-0">
            <div class="absolute top-20 right-0 w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-3xl"></div>
            <div class="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-brand-500/3 rounded-full blur-3xl"></div>
        </div>

        <div class="max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40 w-full relative z-10">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
                {{-- Left Content --}}
                <div>
                    <div class="inline-flex items-center gap-2 bg-brand-600/15 border border-brand-500/20 rounded-full px-4 py-1.5 mb-8 animate-fade-in-up"
                        style="opacity:0">
                        <span class="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
                        <span class="text-brand-300 text-xs font-semibold tracking-wide uppercase">Pesan Futsal
                            Sekarang</span>
                    </div>

                    <h1 class="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight mb-6 animate-fade-in-up delay-100"
                        style="opacity:0">
                        Pesan Lapangan<br>
                        Futsal <span
                            class="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-400">Kapan
                            Saja</span>
                    </h1>

                    <p class="text-gray-400 text-lg leading-relaxed max-w-lg mb-10 animate-fade-in-up delay-200"
                        style="opacity:0">
                        Nikmati kemudahan booking lapangan futsal terbaik di kotamu. Proses cepat, dan terpercaya untuk
                        performa maksimalmu di lapangan.
                    </p>

                    {{-- Search/Booking Form --}}
                    <div class="glass-card rounded-2xl p-5 max-w-xl animate-fade-in-up delay-300" style="opacity:0">
                        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                            <div>
                                <label class="text-gray-400 text-xs font-medium mb-1.5 block">KOTA</label>
                                <select
                                    class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors">
                                    <option>Jakarta</option>
                                    <option>Bandung</option>
                                    <option>Surabaya</option>
                                    <option>Batam</option>
                                </select>
                            </div>
                            <div>
                                <label class="text-gray-400 text-xs font-medium mb-1.5 block">TANGGAL</label>
                                <input type="date"
                                    class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors">
                            </div>
                            <div>
                                <label class="text-gray-400 text-xs font-medium mb-1.5 block">JAM MULAI</label>
                                <select
                                    class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors">
                                    <option>08:00</option>
                                    <option>09:00</option>
                                    <option>10:00</option>
                                    <option>11:00</option>
                                    <option>12:00</option>
                                </select>
                            </div>
                            <div>
                                <label class="text-gray-400 text-xs font-medium mb-1.5 block">JAM SELESAI</label>
                                <select
                                    class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors">
                                    <option>09:00</option>
                                    <option>10:00</option>
                                    <option>11:00</option>
                                    <option>12:00</option>
                                    <option>13:00</option>
                                </select>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <button
                                class="btn-primary flex-1 py-3 text-white font-semibold rounded-xl flex items-center justify-center gap-2 text-sm">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    stroke-width="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="M21 21l-4.35-4.35" />
                                </svg>
                                Cari Lapangan
                            </button>
                            <div class="glass-card-light rounded-xl px-4 py-3 flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center">
                                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24" stroke-width="2">
                                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-white text-xs font-semibold">WAKTU NYATA</p>
                                    <p class="text-gray-400 text-[11px]">Update Instan</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {{-- Right Side - Image Placeholder --}}
                <div class="hidden lg:block animate-fade-in-right delay-300" style="opacity:0">
                    <div class="relative">
                        <div
                            class="w-full h-[400px] rounded-3xl bg-gradient-to-br from-navy-800 to-navy-950 border border-white/10 flex items-center justify-center overflow-hidden">
                            <div class="text-center">
                                <img src="{{ asset('image.png') }}" alt="Hero Image" class="w-full h-full object-cover">
                            </div>
                        </div>
                        {{-- Decorative glow --}}
                        <div class="absolute -bottom-6 -right-6 w-40 h-40 bg-brand-600/20 rounded-full blur-3xl"></div>
                        <div class="absolute -top-6 -left-6 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ===== STATS SECTION ===== --}}
    <section class="bg-white py-16 lg:py-20">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
                <div class="animate-count-up" style="opacity:0" data-animate>
                    <p class="text-3xl lg:text-4xl font-extrabold text-gray-900">10+</p>
                    <p class="text-gray-500 text-xs font-semibold tracking-wider uppercase mt-2">Lapangan Tersedia</p>
                </div>
                <div class="animate-count-up delay-200" style="opacity:0" data-animate>
                    <p class="text-3xl lg:text-4xl font-extrabold text-gray-900">10.000+</p>
                    <p class="text-gray-500 text-xs font-semibold tracking-wider uppercase mt-2">Booking Selesai</p>
                </div>
                <div class="animate-count-up delay-400" style="opacity:0" data-animate>
                    <p class="text-3xl lg:text-4xl font-extrabold text-gray-900 flex items-center justify-center gap-1">
                        4.9
                        <svg class="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    </p>
                    <p class="text-gray-500 text-xs font-semibold tracking-wider uppercase mt-2">Rating Pengguna</p>
                </div>
            </div>
        </div>
    </section>

    {{-- ===== FEATURED COURTS SECTION ===== --}}
    <section id="lapangan" class="bg-gray-50 py-16 lg:py-24">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="flex items-end justify-between mb-12">
                <div>
                    <h2 class="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">Lapangan Unggulan</h2>
                    <p class="text-gray-500 text-base">Pilihan terbaik untuk performa kelas dunia</p>
                </div>
                <a href="#"
                    class="hidden md:flex items-center gap-2 text-brand-600 font-semibold text-sm hover:text-brand-700 transition-colors group">
                    Lihat Semua
                    <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </a>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                @forelse ($lapangan ?? [] as $item)
                    <div class="court-card bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                        <div class="relative h-52 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                            <div class="w-full h-full flex items-center justify-center">
                                <div class="text-center">
                                    <img src="{{ $item['foto'] ?? asset('image.png') }}" alt="{{ $item['nama'] }}"
                                        class="w-full h-full object-cover">
                                </div>
                            </div>
                        </div>
                        <div class="p-5">
                            <div class="flex items-center justify-between mb-2">
                                <h3 class="font-bold text-gray-900 text-lg">{{ $item['nama'] }}</h3>
                                <div class="flex items-center gap-1 bg-brand-50 px-2.5 py-1 rounded-lg">
                                    <span class="text-brand-700 text-xs font-bold uppercase">
                                        {{ str_replace('_', ' ', $item['jenis']) }}
                                    </span>
                                </div>
                            </div>
                            <div class="flex items-center gap-1.5 text-gray-400 text-sm mb-4">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    stroke-width="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 6v6l4 2" />
                                </svg>
                                <span>{{ substr($item['jam_buka'], 0, 5) }} - {{ substr($item['jam_tutup'], 0, 5) }}</span>
                            </div>
                            <div class="flex items-end justify-between">
                                <div>
                                    <span class="text-2xl font-extrabold text-brand-600">
                                        Rp {{ number_format((float) $item['harga_per_jam'], 0, ',', '.') }}
                                    </span>
                                    <span class="text-gray-400 text-sm">/jam</span>
                                </div>
                            </div>
                            <a href="/login"
                                class="btn-primary block text-center w-full mt-4 py-2.5 text-white font-semibold rounded-xl text-sm">
                                Pesan Sekarang
                            </a>
                        </div>
                    </div>
                @empty
                    <div class="col-span-full text-center py-12 text-gray-500">
                        <p class="text-base">Belum ada lapangan tersedia. Pastikan API backend berjalan di
                            <code>{{ config('services.api.base_url') }}</code>.
                        </p>
                    </div>
                @endforelse
            </div>
        </div>
    </section>

    {{-- ===== HOW TO ORDER SECTION ===== --}}
    <section id="cara-pesan" class="bg-white py-16 lg:py-24">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">Cara Pesan Lapangan</h2>
                <p class="text-gray-500 text-base max-w-lg mx-auto">Proses mudah dan cepat untuk mulai bertanding</p>
            </div>

            <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 max-w-4xl mx-auto">
                {{-- Step 1 --}}
                <div class="step-card text-center">
                    <div
                        class="step-icon w-16 h-16 mx-auto mb-5 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center">
                        <svg class="w-7 h-7 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            stroke-width="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                        </svg>
                    </div>
                    <h3 class="font-bold text-gray-900 text-sm mb-2">Pilih Lapangan</h3>
                    <p class="text-gray-400 text-xs leading-relaxed">Cari lapangan terbaik sesuai lokasi dan fasilitas.
                    </p>
                </div>

                {{-- Step 2 --}}
                <div class="step-card text-center">
                    <div
                        class="step-icon w-16 h-16 mx-auto mb-5 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center">
                        <svg class="w-7 h-7 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                    </div>
                    <h3 class="font-bold text-gray-900 text-sm mb-2">Pilih Jadwal</h3>
                    <p class="text-gray-400 text-xs leading-relaxed">Tentukan hari dan jam yang sesuai keinginanmu.</p>
                </div>

                {{-- Step 3 --}}
                <div class="step-card text-center">
                    <div
                        class="step-icon w-16 h-16 mx-auto mb-5 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center">
                        <svg class="w-7 h-7 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            stroke-width="2">
                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                            <line x1="1" y1="10" x2="23" y2="10" />
                        </svg>
                    </div>
                    <h3 class="font-bold text-gray-900 text-sm mb-2">Bayar</h3>
                    <p class="text-gray-400 text-xs leading-relaxed">Lakukan pembayaran aman melalui berbagai kanal
                        digital.</p>
                </div>

                {{-- Step 4 --}}
                <div class="step-card text-center">
                    <div
                        class="step-icon w-16 h-16 mx-auto mb-5 rounded-2xl bg-brand-600 flex items-center justify-center">
                        <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            stroke-width="2">
                            <circle cx="12" cy="12" r="10" />
                            <polygon points="10,8 16,12 10,16" fill="currentColor" />
                        </svg>
                    </div>
                    <h3 class="font-bold text-gray-900 text-sm mb-2">Main!</h3>
                    <p class="text-gray-400 text-xs leading-relaxed">Tunjukkan bukti booking di lokasi dan selamat
                        bermain.</p>
                </div>
            </div>
        </div>
    </section>

    {{-- ===== FOOTER ===== --}}
    <footer id="tentang" class="hero-gradient text-white pt-16 lg:pt-20 pb-8">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
                {{-- Brand Column --}}
                <div>
                    <a href="/" class="flex items-center gap-2.5 mb-5">
                        <div class="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke-width="2" />
                                <path stroke-width="2" d="M8 12l2-6h4l2 6-2 6h-4l-2-6z" />
                            </svg>
                        </div>
                        <span class="text-lg font-bold tracking-tight">GoalBox</span>
                    </a>
                    <p class="text-gray-400 text-sm leading-relaxed mb-6">
                        Solusi digital pemesanan lapangan futsal terdepan. Menjadikan ekosistem olahraga yang modern dan
                        efisien.
                    </p>
                    <div class="flex items-center gap-3">
                        <a href="#"
                            class="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-600 hover:border-brand-600 transition-all">
                            <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                        </a>
                        <a href="#"
                            class="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-600 hover:border-brand-600 transition-all">
                            <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {{-- Menu Utama --}}
                <div>
                    <h3 class="font-bold text-sm mb-5 tracking-wide">Menu Utama</h3>
                    <ul class="space-y-3">
                        <li><a href="#beranda"
                                class="text-gray-400 hover:text-white text-sm transition-colors">Beranda</a></li>
                        <li><a href="#lapangan"
                                class="text-gray-400 hover:text-white text-sm transition-colors">Lapangan</a></li>
                        <li><a href="#cara-pesan" class="text-gray-400 hover:text-white text-sm transition-colors">Cara
                                Pesan</a></li>
                        <li><a href="#tentang" class="text-gray-400 hover:text-white text-sm transition-colors">Tentang
                                Kami</a></li>
                    </ul>
                </div>

                {{-- Pusat Bantuan --}}
                <div>
                    <h3 class="font-bold text-sm mb-5 tracking-wide">Pusat Bantuan</h3>
                    <ul class="space-y-3">
                        <li><a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">Pusat
                                Bantuan</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">Kebijakan
                                Privasi</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">Syarat &
                                Ketentuan</a></li>
                    </ul>
                </div>

                {{-- Kontak Kami --}}
                <div>
                    <h3 class="font-bold text-sm mb-5 tracking-wide">Kontak Kami</h3>
                    <ul class="space-y-3">
                        <li class="flex items-center gap-2.5">
                            <svg class="w-4 h-4 text-brand-400 flex-shrink-0" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" stroke-width="2">
                                <path
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span class="text-gray-400 text-sm">Email Support</span>
                        </li>
                        <li class="flex items-center gap-2.5">
                            <svg class="w-4 h-4 text-brand-400 flex-shrink-0" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" stroke-width="2">
                                <path
                                    d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                            </svg>
                            <span class="text-gray-400 text-sm">WhatsApp Support</span>
                        </li>
                        <li class="flex items-start gap-2.5">
                            <svg class="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span class="text-gray-400 text-sm">Sudirman Central Business District, Batam</span>
                        </li>
                    </ul>
                </div>
            </div>

            {{-- Bottom Footer --}}
            <div class="border-t border-white/10 pt-8">
                <p class="text-gray-500 text-sm text-center">&copy; {{ date('Y') }} GoalBox Futsal. Atomic Precision.
                </p>
            </div>
        </div>
    </footer>

    <script>
        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scroll');
            } else {
                navbar.classList.remove('navbar-scroll');
            }
        });

        // Mobile menu toggle
        document.getElementById('mobileMenuBtn').addEventListener('click', () => {
            document.getElementById('mobileMenu').classList.toggle('hidden');
        });

        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('[data-animate]').forEach(el => {
            observer.observe(el);
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Close mobile menu if open
                    document.getElementById('mobileMenu').classList.add('hidden');
                }
            });
        });
    </script>
</body>

</html>