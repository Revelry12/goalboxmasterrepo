@extends('layouts.app')

@section('meta_description', 'Login ke GoalBox - Platform booking lapangan futsal premium')
@section('title', 'Masuk - GoalBox')

@section('body_class', 'min-h-screen font-sans antialiased')

@section('hide_navbar', true)
@section('hide_footer', true)

@section('content')
    <div class="flex min-h-screen">
        {{-- Left Panel - Branding --}}
        <div
            class="hidden lg:flex lg:w-[45%] xl:w-[42%] login-gradient relative overflow-hidden flex-col justify-between p-10 xl:p-14">
            {{-- Background decorative elements --}}
            <div class="absolute top-0 right-0 w-96 h-96 bg-brand-600/5 rounded-full blur-3xl"></div>
            <div class="absolute bottom-20 left-0 w-80 h-80 bg-brand-500/5 rounded-full blur-3xl"></div>
            <div class="absolute top-1/2 right-10 w-40 h-40 bg-brand-400/3 rounded-full blur-2xl animate-float"></div>

            {{-- Logo --}}
            <div class="relative z-10 animate-fade-in-left">
                <a href="/" class="flex items-center gap-3">
                    <div class="w-10 h-10">
                        <img src="{{ asset('Icon.svg') }}" alt="Hero Image" class="w-full h-full object-cover">

                    </div>
                    <span class="text-white text-xl font-bold tracking-tight">GoalBox</span>
                </a>
            </div>

            {{-- Main Text --}}
            <div class="relative z-10 -mt-10">
                <h1 class="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-6 animate-fade-in-left delay-100"
                    style="opacity:0">
                    Selamat Datang<br>di GoalBox
                </h1>
                <p class="text-gray-400 text-lg leading-relaxed max-w-md animate-fade-in-left delay-200"
                    style="opacity:0">
                    Rasakan pengalaman booking lapangan futsal premium dengan standar profesional dalam satu genggaman.
                </p>
            </div>

            {{-- Feature Cards --}}
            <div class="relative z-10 space-y-4">
                <div class="feature-card rounded-2xl px-5 py-4 flex items-center gap-4 animate-fade-in-left delay-300"
                    style="opacity:0">
                    <div class="w-12 h-12 rounded-xl bg-brand-600/20 flex items-center justify-center flex-shrink-0">
                        <svg class="w-6 h-6 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            stroke-width="2">
                            <rect x="3" y="3" width="7" height="7" rx="1" />
                            <rect x="14" y="3" width="7" height="7" rx="1" />
                            <rect x="3" y="14" width="7" height="7" rx="1" />
                            <rect x="14" y="14" width="7" height="7" rx="1" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-white font-semibold text-sm">50+ Lapangan</h3>
                        <p class="text-gray-400 text-xs mt-0.5">Pilihan lokasi strategis di seluruh kota.</p>
                    </div>
                </div>

                <div class="feature-card rounded-2xl px-5 py-4 flex items-center gap-4 animate-fade-in-left delay-400"
                    style="opacity:0">
                    <div class="w-12 h-12 rounded-xl bg-emerald-600/20 flex items-center justify-center flex-shrink-0">
                        <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            stroke-width="2">
                            <path d="M9 12l2 2 4-4" />
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-white font-semibold text-sm">Pembayaran Aman</h3>
                        <p class="text-gray-400 text-xs mt-0.5">Enkripsi tingkat tinggi untuk transaksi Anda.</p>
                    </div>
                </div>

                <div class="feature-card rounded-2xl px-5 py-4 flex items-center gap-4 animate-fade-in-left delay-500"
                    style="opacity:0">
                    <div class="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                        <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            stroke-width="2">
                            <path d="M4 4h16v16H4z" fill="none" />
                            <path d="M9 9l6 6M15 9l-6 6" />
                            <rect x="4" y="4" width="16" height="16" rx="2" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-white font-semibold text-sm">Refund Terjamin</h3>
                        <p class="text-gray-400 text-xs mt-0.5">Kemudahan klaim jika terjadi kendala teknis.</p>
                    </div>
                </div>
            </div>
        </div>

        {{-- Right Panel - Login Form --}}
        <div class="flex-1 flex flex-col bg-white">
            {{-- Back to Home --}}
            <div class="flex justify-end p-6 lg:p-8">
                <a href="/"
                    class="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors text-sm font-medium group">
                    <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Kembali ke Beranda
                </a>
            </div>

            {{-- Form Container --}}
            <div class="flex-1 flex items-center justify-center px-6 lg:px-8">
                <div class="w-full max-w-md animate-fade-in-up">
                    <h2 class="text-3xl font-bold text-gray-900 mb-2">Masuk</h2>
                    <p class="text-gray-500 mb-8">
                        Belum punya akun?
                        <a href="#" class="text-brand-600 font-semibold hover:text-brand-700 transition-colors">Daftar
                            sekarang</a>
                    </p>

                    {{-- Error Messages --}}
                    @if ($errors->any())
                        <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-scale-in">
                            <div class="flex items-center gap-2">
                                <svg class="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" stroke-width="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="15" y1="9" x2="9" y2="15" />
                                    <line x1="9" y1="9" x2="15" y2="15" />
                                </svg>
                                <span class="text-red-600 text-sm font-medium">{{ $errors->first() }}</span>
                            </div>
                        </div>
                    @endif

                    <form method="POST" action="{{ route('login') }}" id="loginForm">
                        @csrf

                        {{-- Email Field --}}
                        <div class="mb-5">
                            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24" stroke-width="1.5">
                                        <path
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <input type="email" id="email" name="email" value="{{ old('email') }}"
                                    placeholder="nama@email.com"
                                    class="input-field w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none text-sm"
                                    required autocomplete="email">
                            </div>
                        </div>

                        {{-- Password Field --}}
                        <div class="mb-5">
                            <div class="flex items-center justify-between mb-2">
                                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                                <a href="#"
                                    class="text-sm text-brand-600 font-medium hover:text-brand-700 transition-colors">Lupa
                                    password?</a>
                            </div>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24" stroke-width="1.5">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0110 0v4" />
                                    </svg>
                                </div>
                                <input type="password" id="password" name="password" placeholder="••••••••"
                                    class="input-field w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none text-sm"
                                    required autocomplete="current-password">
                                <button type="button" id="togglePassword"
                                    class="absolute inset-y-0 right-0 pr-4 flex items-center password-toggle text-gray-400">
                                    <svg id="eyeIcon" class="w-5 h-5" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24" stroke-width="1.5">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                    <svg id="eyeOffIcon" class="w-5 h-5 hidden" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24" stroke-width="1.5">
                                        <path
                                            d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {{-- Remember Me --}}
                        <div class="flex items-center mb-7">
                            <input type="checkbox" id="remember" name="remember"
                                class="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500 cursor-pointer">
                            <label for="remember" class="ml-2.5 text-sm text-gray-600 cursor-pointer select-none">Ingat
                                saya</label>
                        </div>

                        {{-- Submit Button --}}
                        <button type="submit" id="loginBtn"
                            class="btn-primary w-full py-3.5 text-white font-semibold rounded-xl flex items-center justify-center gap-2 text-sm">
                            <span>Masuk</span>
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </form>

                    {{-- Dummy Credentials Info --}}
                    <div class="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                        <div class="flex items-start gap-2">
                            <svg class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" stroke-width="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4M12 8h.01" />
                            </svg>
                            <div>
                                <p class="text-blue-700 text-xs font-semibold mb-1">Demo Credentials</p>
                                <p class="text-blue-600 text-xs">Email: <span
                                        class="font-mono font-medium">admin@goalbox.com</span></p>
                                <p class="text-blue-600 text-xs">Password: <span
                                        class="font-mono font-medium">password</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Footer --}}
            <div class="text-center py-6 text-gray-400 text-xs">
                &copy; {{ date('Y') }} GoalBox Futsal. All rights reserved.
            </div>
        </div>
    </div>

@endsection

@section('scripts')
    <script>
        // Toggle password visibility
        document.getElementById('togglePassword').addEventListener('click', function () {
            const passwordInput = document.getElementById('password');
            const eyeIcon = document.getElementById('eyeIcon');
            const eyeOffIcon = document.getElementById('eyeOffIcon');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                eyeIcon.classList.add('hidden');
                eyeOffIcon.classList.remove('hidden');
            } else {
                passwordInput.type = 'password';
                eyeIcon.classList.remove('hidden');
                eyeOffIcon.classList.add('hidden');
            }
        });

        // Form submit loading state
        document.getElementById('loginForm').addEventListener('submit', function () {
            const btn = document.getElementById('loginBtn');
            btn.innerHTML = `
                <svg class="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Memproses...</span>
            `;
            btn.disabled = true;
            btn.classList.add('opacity-75', 'cursor-not-allowed');
        });
    </script>
@endsection