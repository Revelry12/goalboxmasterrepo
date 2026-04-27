<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdminSession
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->session()->get('authenticated') || ! $request->session()->get('api_token')) {
            return redirect('/login');
        }

        if ($request->session()->get('user.role') !== 'admin') {
            return redirect('/')->with('status', 'Akses admin diperlukan.');
        }

        return $next($request);
    }
}
