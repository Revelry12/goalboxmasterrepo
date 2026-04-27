<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Landing Page
Route::get('/', function () {
    return view('landing');
})->name('landing');

// Auth Routes
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Dashboard (protected with simple session check)
Route::get('/dashboard', function () {
    if (!session('authenticated')) {
        return redirect('/login');
    }
    return view('dashboard');
})->name('dashboard');

// Detail Page (Dummy)
Route::get('/detail', function () {
    return view('detail');
})->name('detail');
