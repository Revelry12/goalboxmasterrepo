@extends('layouts.app')

@section('meta_description', 'GoalBox - Platform booking lapangan futsal premium. Pesan lapangan futsal kapan saja dengan mudah dan cepat.')
@section('title', 'GoalBox - Booking Lapangan Futsal Premium')

@section('body_class', 'bg-white font-sans antialiased')

@section('content')

    <x-slot:navbar_class>
        transition-all duration-500
    </x-slot:navbar_class>

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
                        Futsal <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-400">Kapan
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
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="M21 21l-4.35-4.35" />
                                </svg>
                                Cari Lapangan
                            </button>
                            <div class="glass-card-light rounded-xl px-4 py-3 flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center">
                                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        stroke-width="2">
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
                    <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </a>
            </div>

            @php
                $lapanganUnggulan = [
                    [
                        'nama' => 'Arena Pro Blue',
                        'rating' => '4.7',
                        'lokasi' => 'Sudirman, Jakarta',
                        'harga' => '250.000',
                        'gambar' => asset('image.png')
                    ],
                    [
                        'nama' => 'Elite Parquet Court',
                        'rating' => '4.8',
                        'lokasi' => 'Kuningan, Jakarta',
                        'harga' => '300.000',
                        'gambar' => asset('image.png')
                    ],
                    [
                        'nama' => 'Green Turf Arena',
                        'rating' => '4.9',
                        'lokasi' => 'Senayan, Jakarta',
                        'harga' => '225.000',
                        'gambar' => asset('image.png')
                    ]
                ];
            @endphp
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                @foreach($lapanganUnggulan as $lapangan)
                    <div class="court-card bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                        <div class="relative h-52 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                            <div class="w-full h-full flex items-center justify-center">
                                <div class="text-center">
                                    <img src="{{ $lapangan['gambar'] }}" alt="{{ $lapangan['nama'] }}"
                                        class="w-full h-full object-cover">
                                </div>
                            </div>
                        </div>
                        <div class="p-5">
                            <div class="flex items-center justify-between mb-2">
                                <h3 class="font-bold text-gray-900 text-lg">{{ $lapangan['nama'] }}</h3>
                                <div class="flex items-center gap-1 bg-yellow-50 px-2.5 py-1 rounded-lg">
                                    <svg class="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <span class="text-yellow-700 text-xs font-bold">{{ $lapangan['rating'] }}</span>
                                </div>
                            </div>
                            <div class="flex items-center gap-1.5 text-gray-400 text-sm mb-4">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                <span>{{ $lapangan['lokasi'] }}</span>
                            </div>
                            <div class="flex items-end justify-between">
                                <div>
                                    <span class="text-2xl font-extrabold text-brand-600">Rp {{ $lapangan['harga'] }}</span>
                                    <span class="text-gray-400 text-sm">/jam</span>
                                </div>
                            </div>
                            <a href="/detail"
                                class="btn-primary w-full mt-4 py-2.5 text-white font-semibold rounded-xl text-sm flex items-center justify-center transition-opacity hover:opacity-90">Pesan
                                Sekarang</a>
                        </div>
                    </div>
                @endforeach
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

            @php
                $caraPesan = [
                    [
                        'title' => 'Pilih Lapangan',
                        'desc' => 'Cari lapangan terbaik sesuai lokasi dan fasilitas.',
                        'icon' => '<circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />',
                        'bg' => 'bg-brand-50 border border-brand-100',
                        'icon_color' => 'text-brand-600'
                    ],
                    [
                        'title' => 'Pilih Jadwal',
                        'desc' => 'Tentukan hari dan jam yang sesuai keinginanmu.',
                        'icon' => '<rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />',
                        'bg' => 'bg-brand-50 border border-brand-100',
                        'icon_color' => 'text-brand-600'
                    ],
                    [
                        'title' => 'Bayar',
                        'desc' => 'Lakukan pembayaran aman melalui berbagai kanal digital.',
                        'icon' => '<rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" />',
                        'bg' => 'bg-brand-50 border border-brand-100',
                        'icon_color' => 'text-brand-600'
                    ],
                    [
                        'title' => 'Main!',
                        'desc' => 'Tunjukkan bukti booking di lokasi dan selamat bermain.',
                        'icon' => '<circle cx="12" cy="12" r="10" /><polygon points="10,8 16,12 10,16" fill="currentColor" />',
                        'bg' => 'bg-brand-600 border border-transparent',
                        'icon_color' => 'text-white'
                    ]
                ];
            @endphp
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 max-w-4xl mx-auto">
                @foreach($caraPesan as $langkah)
                    <div class="step-card text-center">
                        <div
                            class="step-icon w-16 h-16 mx-auto mb-5 rounded-2xl {{ $langkah['bg'] }} flex items-center justify-center">
                            <svg class="w-7 h-7 {{ $langkah['icon_color'] }}" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" stroke-width="2">
                                {!! $langkah['icon'] !!}
                            </svg>
                        </div>
                        <h3 class="font-bold text-gray-900 text-sm mb-2">{{ $langkah['title'] }}</h3>
                        <p class="text-gray-400 text-xs leading-relaxed">{{ $langkah['desc'] }}</p>
                    </div>
                @endforeach
            </div>
        </div>
    </section>



@endsection

@section('scripts')
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
@endsection