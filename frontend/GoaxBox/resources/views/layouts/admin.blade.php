<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="GoalBox Admin Dashboard - Kelola lapangan futsal Anda">
    <title>@yield('title', 'Admin') - GoalBox</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @stack('head')
</head>

<body class="bg-surface-dark font-sans antialiased text-white min-h-screen">
    @php
        $sessionUser = session('user');
        $current = \Illuminate\Support\Facades\Route::currentRouteName();
        $menus = [
            ['route' => 'dashboard', 'label' => 'Dashboard', 'href' => '/dashboard'],
            ['route' => 'admin.lapangan', 'label' => 'Kelola Lapangan', 'href' => '#'],
            ['route' => 'admin.bookings', 'label' => 'Kelola Booking', 'href' => '#'],
            ['route' => 'admin.payments', 'label' => 'Pembayaran', 'href' => '#'],
            ['route' => 'admin.reports', 'label' => 'Laporan', 'href' => '#'],
            ['route' => 'admin.notifications', 'label' => 'Notifikasi', 'href' => '#'],
            ['route' => 'admin.settings', 'label' => 'Pengaturan', 'href' => '#'],
        ];
    @endphp

    <div class="flex min-h-screen">

        {{-- ===== SIDEBAR ===== --}}
        <aside id="sidebar"
            class="sidebar-gradient w-64 fixed left-0 top-0 bottom-0 z-40 flex flex-col border-r border-white/5 transition-transform duration-300 lg:translate-x-0 -translate-x-full">
            {{-- Logo --}}
            <div class="px-6 py-6 border-b border-white/5">
                <a href="{{ route('dashboard') }}" class="flex items-center gap-3">
                    <div class="w-10 h-10">
                        <img src="{{ asset('icon.svg') }}" alt="GoalBox Logo" class="w-full h-full object-cover">
                    </div>
                    <div>
                        <span class="text-white text-lg font-bold tracking-tight block">GoalBox</span>
                        <span class="text-gray-500 text-[10px] font-medium tracking-widest uppercase">Admin Panel</span>
                    </div>
                </a>
            </div>

            {{-- Navigation --}}
            <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                @foreach ($menus as $menu)
                    @php $isActive = $current === $menu['route']; @endphp
                    <a href="{{ $menu['href'] }}"
                        class="sidebar-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium {{ $isActive ? 'active text-white' : 'text-gray-400 hover:text-white' }}">
                        <svg class="w-5 h-5 {{ $isActive ? 'text-brand-400' : '' }}" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" stroke-width="2">
                            <rect x="3" y="3" width="7" height="7" rx="1" />
                            <rect x="14" y="3" width="7" height="7" rx="1" />
                            <rect x="3" y="14" width="7" height="7" rx="1" />
                            <rect x="14" y="14" width="7" height="7" rx="1" />
                        </svg>
                        {{ $menu['label'] }}
                    </a>
                @endforeach
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
                        <button id="sidebarToggle" class="lg:hidden text-gray-400 hover:text-white transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <h1 class="text-xl font-bold text-white">@yield('header-title', 'Dashboard')</h1>
                    </div>

                    <div class="flex items-center gap-4">
                        <div
                            class="hidden md:flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 w-64">
                            <svg class="w-4 h-4 text-gray-500 mr-3" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" stroke-width="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                            </svg>
                            <input type="text" placeholder="Cari data..."
                                class="bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none w-full">
                        </div>

                        <button class="relative text-gray-400 hover:text-white transition-colors p-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 01-3.46 0" />
                            </svg>
                        </button>

                        {{-- Profile --}}
                        <div class="flex items-center gap-3 pl-4 border-l border-white/10">
                            <div class="text-right hidden sm:block">
                                <p class="text-sm font-semibold text-white">{{ $sessionUser['name'] ?? '' }}</p>
                                <p class="text-xs text-gray-500">{{ ucfirst($sessionUser['role'] ?? '') }}</p>
                            </div>
                            <div
                                class="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                {{ strtoupper(substr($sessionUser['name'] ?? '?', 0, 1)) }}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {{-- Page Content --}}
            <div class="p-6 lg:p-8">
                @yield('content')
            </div>
        </main>
    </div>

    {{-- Sidebar Overlay (mobile) --}}
    <div id="sidebarOverlay" class="fixed inset-0 bg-black/60 z-30 hidden lg:hidden" onclick="closeSidebar()"></div>

    <script>
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
    </script>

    @stack('scripts')
</body>

</html>
