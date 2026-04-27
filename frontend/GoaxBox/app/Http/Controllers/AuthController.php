<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    // Dummy user data
    private $dummyUsers = [
        [
            'email' => 'admin@goalbox.com',
            'password' => 'password',
            'name' => 'Admin Utama',
            'role' => 'Super Admin',
        ],
    ];

    public function showLogin()
    {
        if (session('authenticated')) {
            return redirect('/dashboard');
        }
        return view('login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        foreach ($this->dummyUsers as $user) {
            if ($request->email === $user['email'] && $request->password === $user['password']) {
                session([
                    'authenticated' => true,
                    'user' => [
                        'name' => $user['name'],
                        'email' => $user['email'],
                        'role' => $user['role'],
                    ],
                ]);
                return redirect('/dashboard');
            }
        }

        return back()->withErrors(['email' => 'Email atau password salah.'])->withInput($request->only('email'));
    }

    public function logout()
    {
        session()->forget(['authenticated', 'user']);
        return redirect('/');
    }
}
