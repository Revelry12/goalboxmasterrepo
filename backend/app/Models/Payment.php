<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    use HasFactory;

    public const METODE_TRANSFER = 'transfer_manual';
    public const METODE_MIDTRANS = 'midtrans';

    public const STATUS_PENDING = 'pending';
    public const STATUS_MENUNGGU_VERIFIKASI = 'menunggu_verifikasi';
    public const STATUS_PAID = 'paid';
    public const STATUS_FAILED = 'failed';
    public const STATUS_EXPIRED = 'expired';
    public const STATUS_REFUNDED = 'refunded';

    protected $fillable = [
        'booking_id',
        'metode',
        'nominal',
        'status_bayar',
        'bukti_bayar',
        'order_id',
        'snap_token',
        'transaction_id',
        'payment_type',
        'va_number',
        'bank',
        'fraud_status',
        'raw_response',
        'paid_at',
        'expired_at',
    ];

    protected function casts(): array
    {
        return [
            'nominal' => 'decimal:2',
            'raw_response' => 'array',
            'paid_at' => 'datetime',
            'expired_at' => 'datetime',
        ];
    }

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }
}
