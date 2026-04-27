<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained('bookings')->cascadeOnDelete();
            $table->enum('metode', ['transfer_manual', 'midtrans'])->default('midtrans');
            $table->decimal('nominal', 12, 2);
            $table->enum('status_bayar', [
                'pending',
                'menunggu_verifikasi',
                'paid',
                'failed',
                'expired',
                'refunded',
            ])->default('pending')->index();
            $table->string('bukti_bayar')->nullable();

            // Midtrans fields
            $table->string('order_id', 64)->nullable()->unique();
            $table->string('snap_token')->nullable();
            $table->string('transaction_id')->nullable();
            $table->string('payment_type')->nullable();
            $table->string('va_number')->nullable();
            $table->string('bank')->nullable();
            $table->string('fraud_status')->nullable();
            $table->json('raw_response')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('expired_at')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
