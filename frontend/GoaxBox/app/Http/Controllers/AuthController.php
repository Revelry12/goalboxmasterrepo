<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AuthController extends Controller
{
    public function showLogin()
    {
        if (session('authenticated')) {
            return $this->redirectAfterLogin();
        }
        return view('login');
    }

    private function redirectAfterLogin()
    {
        $role = session('user.role');

        if ($role === 'admin') {
            return redirect('/dashboard');
        }

        return redirect('/')->with('status', 'Login berhasil. Fitur dashboard customer belum tersedia.');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $response = Http::acceptJson()
            ->post(rtrim(config('services.api.base_url'), '/').'/api/login', [
                'email' => $request->email,
                'password' => $request->password,
            ]);

        if ($response->failed()) {
            $message = $response->json('errors.email.0')
                ?? $response->json('message')
                ?? 'Email atau password salah.';
            return back()->withErrors(['email' => $message])->withInput($request->only('email'));
        }

        $body = $response->json();
        session([
            'authenticated' => true,
            'api_token' => $body['token'],
            'user' => $body['user'],
        ]);

        return $this->redirectAfterLogin();
    }

    public function logout(Request $request)
    {
        if ($token = session('api_token')) {
            Http::withToken($token)
                ->acceptJson()
                ->post(rtrim(config('services.api.base_url'), '/').'/api/logout');
        }

        session()->forget(['authenticated', 'api_token', 'user']);
        return redirect('/');
    }
}
