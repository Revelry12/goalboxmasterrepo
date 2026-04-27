<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="@yield('meta_description', 'GoalBox - Platform booking lapangan futsal premium')">
    <title>@yield('title', 'GoalBox')</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    @yield('head_scripts')
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="@yield('body_class', 'bg-[#0a1128] font-sans antialiased text-gray-300 flex flex-col min-h-screen')">
    @unless(View::hasSection('hide_navbar'))
        @include('partials.navbar')
    @endunless

    @yield('content')

    @unless(View::hasSection('hide_footer'))
        @include('partials.footer')
    @endunless

    @yield('scripts')
</body>

</html>
