<nav id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 @yield('navbar_class')">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex items-center justify-between h-18">
            {{-- Logo --}}
            <a href="/" class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke-width="2"/>
                        <path stroke-width="2" d="M8 12l2-6h4l2 6-2 6h-4l-2-6z"/>
                    </svg>
                </div>
                <span class="text-white text-lg font-bold tracking-tight uppercase">GoalBox</span>
            </a>

            {{-- Desktop Nav Links --}}
            <div class="hidden md:flex items-center gap-8">
                <a href="/#beranda" class="text-gray-300 hover:text-white transition-colors text-sm font-medium">Beranda</a>
                <a href="/#lapangan" class="text-gray-300 hover:text-white transition-colors text-sm font-medium">Lapangan</a>
                <a href="/#cara-pesan" class="text-gray-300 hover:text-white transition-colors text-sm font-medium">Cara Pesan</a>
                <a href="/#tentang" class="text-gray-300 hover:text-white transition-colors text-sm font-medium">Tentang Kami</a>
            </div>

            {{-- Auth Buttons --}}
            <div class="hidden md:flex items-center gap-3">
                <a href="/login" class="text-gray-300 hover:text-white transition-colors text-sm font-medium px-4 py-2">Masuk</a>
                <a href="/register" class="bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all hover:shadow-lg hover:shadow-brand-600/25">Daftar</a>
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
            <a href="/#beranda" class="block text-gray-300 hover:text-white transition-colors text-sm font-medium py-2">Beranda</a>
            <a href="/#lapangan" class="block text-gray-300 hover:text-white transition-colors text-sm font-medium py-2">Lapangan</a>
            <a href="/#cara-pesan" class="block text-gray-300 hover:text-white transition-colors text-sm font-medium py-2">Cara Pesan</a>
            <a href="/#tentang" class="block text-gray-300 hover:text-white transition-colors text-sm font-medium py-2">Tentang Kami</a>
            <hr class="border-white/10">
            <a href="/login" class="block text-gray-300 hover:text-white transition-colors text-sm font-medium py-2">Masuk</a>
            <a href="/register" class="block bg-brand-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg text-center">Daftar</a>
        </div>
    </div>
</nav>
