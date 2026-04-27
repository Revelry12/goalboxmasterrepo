<?php

namespace Database\Seeders;

use App\Models\Lapangan;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@futsal.test'],
            [
                'name' => 'Admin Utama',
                'phone' => '081200000001',
                'password' => 'password',
                'role' => User::ROLE_ADMIN,
            ]
        );

        User::updateOrCreate(
            ['email' => 'customer@futsal.test'],
            [
                'name' => 'Customer Demo',
                'phone' => '081200000002',
                'password' => 'password',
                'role' => User::ROLE_CUSTOMER,
            ]
        );

        $sample = [
            ['nama' => 'Lapangan A', 'jenis' => 'vinyl', 'harga_per_jam' => 120000],
            ['nama' => 'Lapangan B', 'jenis' => 'rumput_sintetis', 'harga_per_jam' => 150000],
            ['nama' => 'Lapangan C', 'jenis' => 'interlock', 'harga_per_jam' => 100000],
        ];
        foreach ($sample as $row) {
            Lapangan::updateOrCreate(
                ['nama' => $row['nama']],
                array_merge($row, [
                    'status' => Lapangan::STATUS_AKTIF,
                    'jam_buka' => '08:00:00',
                    'jam_tutup' => '23:00:00',
                    'deskripsi' => 'Lapangan futsal indoor '.$row['nama'],
                ])
            );
        }
    }
}
