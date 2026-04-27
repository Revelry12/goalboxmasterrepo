<?php

use App\Http\Controllers\Api\Admin\AdminBookingController;
use App\Http\Controllers\Api\Admin\AdminLapanganController;
use App\Http\Controllers\Api\Admin\AdminReportController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\LapanganController;
use App\Http\Controllers\Api\PaymentController;
use Illuminate\Support\Facades\Route;

// -------- Public --------
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public lapangan listing & availability (browsing)
Route::get('/lapangan', [LapanganController::class, 'index']);
Route::get('/lapangan/{lapangan}', [LapanganController::class, 'show']);
Route::get('/lapangan/{lapangan}/availability', [LapanganController::class, 'availability']);

// Midtrans webhook — must be public
Route::post('/midtrans/notification', [PaymentController::class, 'midtransNotification']);

// -------- Authenticated --------
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);

    // Customer-only
    Route::middleware('role:customer,admin')->group(function () {
        Route::get('/bookings', [BookingController::class, 'index']);
        Route::post('/bookings', [BookingController::class, 'store']);
        Route::get('/bookings/{booking}', [BookingController::class, 'show']);
        Route::post('/bookings/{booking}/cancel', [BookingController::class, 'cancel']);
        Route::post('/bookings/{booking}/upload-proof', [PaymentController::class, 'uploadProof']);
        Route::get('/bookings/{booking}/invoice', [PaymentController::class, 'invoice']);
    });

    // Admin-only
    Route::prefix('admin')->middleware('role:admin')->group(function () {
        Route::get('/dashboard', [AdminReportController::class, 'dashboard']);
        Route::get('/reports/revenue', [AdminReportController::class, 'revenue']);

        Route::apiResource('lapangan', AdminLapanganController::class);
        Route::patch('lapangan/{lapangan}/status', [AdminLapanganController::class, 'setStatus']);

        Route::get('/bookings', [AdminBookingController::class, 'index']);
        Route::get('/bookings/{booking}', [AdminBookingController::class, 'show']);
        Route::post('/bookings/{booking}/verify', [AdminBookingController::class, 'verify']);
        Route::post('/payments/{payment}/verify', [AdminBookingController::class, 'verifyPayment']);
    });
});
