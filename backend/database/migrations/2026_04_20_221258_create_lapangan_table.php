<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lapangan', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->enum('jenis', ['vinyl', 'rumput_sintetis', 'interlock', 'semen', 'parquet'])->default('vinyl');
            $table->decimal('harga_per_jam', 12, 2);
            $table->enum('status', ['aktif', 'nonaktif', 'maintenance'])->default('aktif')->index();
            $table->text('deskripsi')->nullable();
            $table->string('foto')->nullable();
            $table->time('jam_buka')->default('08:00:00');
            $table->time('jam_tutup')->default('23:00:00');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lapangan');
    }
};
