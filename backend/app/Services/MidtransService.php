<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Payment;
use Midtrans\Config;
use Midtrans\Notification;
use Midtrans\Snap;

class MidtransService
{
    public function __construct()
    {
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');
    }

    public function createSnapToken(Booking $booking, Payment $payment): string
    {
        $booking->loadMissing(['user', 'lapangan']);

        $params = [
            'transaction_details' => [
                'order_id' => $payment->order_id,
                'gross_amount' => (int) $payment->nominal,
            ],
            'customer_details' => [
                'first_name' => $booking->user->name,
                'email' => $booking->user->email,
                'phone' => $booking->user->phone ?? '',
            ],
            'item_details' => [[
                'id' => 'LP-'.$booking->lapangan_id,
                'price' => (int) $payment->nominal,
                'quantity' => 1,
                'name' => 'Booking '.$booking->lapangan->nama.' ('.$booking->durasi_jam.' jam)',
            ]],
        ];

        return Snap::getSnapToken($params);
    }

    public function parseNotification(): Notification
    {
        return new Notification();
    }

    public function mapStatus(string $transactionStatus, ?string $fraudStatus = null): string
    {
        return match ($transactionStatus) {
            'capture' => $fraudStatus === 'challenge'
                ? Payment::STATUS_MENUNGGU_VERIFIKASI
                : Payment::STATUS_PAID,
            'settlement' => Payment::STATUS_PAID,
            'pending' => Payment::STATUS_PENDING,
            'deny', 'cancel', 'failure' => Payment::STATUS_FAILED,
            'expire' => Payment::STATUS_EXPIRED,
            'refund', 'partial_refund' => Payment::STATUS_REFUNDED,
            default => Payment::STATUS_PENDING,
        };
    }
}
