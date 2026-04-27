<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Payment;
use App\Services\MidtransService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class PaymentController extends Controller
{
    public function uploadProof(Request $request, Booking $booking): JsonResponse
    {
        if ($booking->user_id !== $request->user()->id) {
            abort(403, 'Forbidden.');
        }

        $payment = $booking->payment;
        if (! $payment) {
            abort(404, 'Payment not found.');
        }
        if ($payment->metode !== Payment::METODE_TRANSFER) {
            throw ValidationException::withMessages([
                'metode' => ['Upload bukti hanya berlaku untuk metode transfer manual.'],
            ]);
        }
        if (in_array($payment->status_bayar, [Payment::STATUS_PAID, Payment::STATUS_REFUNDED], true)) {
            throw ValidationException::withMessages([
                'status_bayar' => ['Pembayaran sudah final, tidak dapat diubah.'],
            ]);
        }

        $data = $request->validate([
            'bukti_bayar' => ['required', 'file', 'image', 'max:4096'],
        ]);

        $path = $data['bukti_bayar']->store('payment-proofs', 'public');

        $payment->update([
            'bukti_bayar' => $path,
            'status_bayar' => Payment::STATUS_MENUNGGU_VERIFIKASI,
        ]);

        $booking->update(['status_booking' => Booking::STATUS_MENUNGGU_VERIFIKASI]);

        return response()->json([
            'message' => 'Bukti pembayaran berhasil diupload, menunggu verifikasi admin.',
            'payment' => $payment->fresh(),
        ]);
    }

    /**
     * Midtrans server-to-server notification callback.
     * Route must be excluded from auth middleware.
     */
    public function midtransNotification(Request $request, MidtransService $midtrans): JsonResponse
    {
        try {
            $notif = $midtrans->parseNotification();
        } catch (\Throwable $e) {
            Log::warning('Midtrans parse error: '.$e->getMessage());
            return response()->json(['message' => 'Invalid notification'], 400);
        }

        $payment = Payment::where('order_id', $notif->order_id)->first();
        if (! $payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        $newStatus = $midtrans->mapStatus($notif->transaction_status, $notif->fraud_status ?? null);

        $payment->update([
            'status_bayar' => $newStatus,
            'transaction_id' => $notif->transaction_id ?? $payment->transaction_id,
            'payment_type' => $notif->payment_type ?? $payment->payment_type,
            'va_number' => $notif->va_numbers[0]->va_number ?? $payment->va_number,
            'bank' => $notif->va_numbers[0]->bank ?? $payment->bank,
            'fraud_status' => $notif->fraud_status ?? $payment->fraud_status,
            'raw_response' => (array) $notif,
            'paid_at' => $newStatus === Payment::STATUS_PAID ? now() : $payment->paid_at,
        ]);

        // Auto sync booking status
        $booking = $payment->booking;
        if ($newStatus === Payment::STATUS_PAID) {
            $booking->update(['status_booking' => Booking::STATUS_CONFIRMED]);
        } elseif (in_array($newStatus, [Payment::STATUS_FAILED, Payment::STATUS_EXPIRED], true)) {
            $booking->update(['status_booking' => Booking::STATUS_CANCELLED]);
        }

        return response()->json(['message' => 'Notification processed', 'status' => $newStatus]);
    }

    public function invoice(Request $request, Booking $booking)
    {
        if ($booking->user_id !== $request->user()->id && ! $request->user()->isAdmin()) {
            abort(403, 'Forbidden.');
        }
        $booking->load(['user', 'lapangan', 'payment']);

        $pdf = Pdf::loadView('invoices.booking', ['booking' => $booking]);

        return $pdf->download('invoice-'.$booking->kode_booking.'.pdf');
    }
}
