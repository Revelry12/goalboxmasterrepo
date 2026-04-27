<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lapangan extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'lapangan';

    public const STATUS_AKTIF = 'aktif';
    public const STATUS_NONAKTIF = 'nonaktif';
    public const STATUS_MAINTENANCE = 'maintenance';

    protected $fillable = [
        'nama',
        'jenis',
        'harga_per_jam',
        'status',
        'deskripsi',
        'foto',
        'jam_buka',
        'jam_tutup',
    ];

    protected function casts(): array
    {
        return [
            'harga_per_jam' => 'decimal:2',
        ];
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function scopeAktif($query)
    {
        return $query->where('status', self::STATUS_AKTIF);
    }
}
