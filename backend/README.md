# Sistem Lapangan Futsal — Backend API

Laravel 11 REST API backend untuk sistem booking lapangan futsal. Auth via Sanctum token, role-based (admin/customer), integrasi Midtrans Snap, invoice PDF via DomPDF.

## Setup cepat

```bash
cd backend
composer install
cp .env.example .env            # jika belum ada
php artisan key:generate
php artisan migrate:fresh --seed
php artisan storage:link
php artisan serve
```

Base URL: `http://127.0.0.1:8000/api`

### Akun demo (dari seeder)

| Role     | Email                    | Password |
|----------|--------------------------|----------|
| admin    | admin@futsal.test        | password |
| customer | customer@futsal.test     | password |

### Konfigurasi Midtrans

Di `.env`:

```
MIDTRANS_SERVER_KEY=SB-Mid-server-xxx
MIDTRANS_CLIENT_KEY=SB-Mid-client-xxx
MIDTRANS_IS_PRODUCTION=false
```

Set URL webhook di dashboard Midtrans → Settings → Configuration:
`POST {APP_URL}/api/midtrans/notification`

## Endpoint (Postman)

Semua request auth pakai header `Authorization: Bearer {token}` + `Accept: application/json`.

### Public
| Method | Path | Deskripsi |
|--------|------|-----------|
| POST | `/api/register` | Register customer |
| POST | `/api/login` | Login (return token + role) |
| GET | `/api/lapangan` | List lapangan aktif (search `?q=`, `?jenis=`) |
| GET | `/api/lapangan/{id}` | Detail lapangan |
| GET | `/api/lapangan/{id}/availability?tanggal=YYYY-MM-DD` | Slot yang sudah dibooking |
| POST | `/api/midtrans/notification` | Webhook Midtrans (S2S) |

### Authenticated (customer/admin)
| Method | Path | Deskripsi |
|--------|------|-----------|
| GET | `/api/me` | Profil user |
| POST | `/api/logout` | Revoke token |
| PUT | `/api/profile` | Update name/phone/email/password |
| GET | `/api/bookings` | Riwayat booking |
| POST | `/api/bookings` | Buat booking baru |
| GET | `/api/bookings/{id}` | Detail booking |
| POST | `/api/bookings/{id}/cancel` | Batalkan booking |
| POST | `/api/bookings/{id}/upload-proof` | Upload bukti transfer (file `bukti_bayar`) |
| GET | `/api/bookings/{id}/invoice` | Download invoice PDF |

Body `POST /api/bookings`:
```json
{
  "lapangan_id": 1,
  "tanggal": "2026-04-25",
  "jam_mulai": "19:00",
  "jam_selesai": "20:00",
  "metode": "midtrans",
  "catatan": "optional"
}
```
Jika `metode=midtrans`, response berisi `snap_token` untuk Snap.js di frontend.

### Admin only (`role:admin`)
| Method | Path | Deskripsi |
|--------|------|-----------|
| GET | `/api/admin/dashboard` | Statistik ringkas |
| GET | `/api/admin/reports/revenue?start=&end=&group_by=day\|month\|lapangan` | Laporan pendapatan |
| GET/POST/PUT/DELETE | `/api/admin/lapangan[/{id}]` | CRUD lapangan |
| PATCH | `/api/admin/lapangan/{id}/status` | Ubah status (aktif/nonaktif/maintenance) |
| GET | `/api/admin/bookings` | List semua booking (filter `?status=`, `?lapangan_id=`, `?tanggal=`) |
| GET | `/api/admin/bookings/{id}` | Detail booking |
| POST | `/api/admin/bookings/{id}/verify` | `{"keputusan":"approve\|reject"}` |
| POST | `/api/admin/payments/{id}/verify` | Verifikasi pembayaran manual |

## Arsitektur penting

- **Validasi jadwal bentrok** — `BookingController::store` memakai `DB::transaction` + `lockForUpdate` pada lapangan dan query overlap (`jam_mulai < jam_selesai_baru AND jam_selesai > jam_mulai_baru`) untuk mencegah race condition saat dua user booking slot sama bersamaan.
- **Role separation** — middleware `role:admin` / `role:customer,admin` via alias di `bootstrap/app.php`.
- **Auto sync status** — webhook Midtrans memetakan `transaction_status` ke `payments.status_bayar`, dan otomatis update `bookings.status_booking` (`paid → confirmed`, `failed/expired → cancelled`).
- **Invoice PDF** — Blade view `resources/views/invoices/booking.blade.php` di-render DomPDF.
- **Scalability** — ERD terpisah (users, lapangan, bookings, payments) + soft delete pada lapangan, kolom `order_id` unique pada payments untuk lookup webhook, indexes pada `(lapangan_id, tanggal)` dan `(user_id, created_at)`.

## Struktur database (hasil migrate)

```
users(id, name, email, phone, password, role, timestamps)
lapangan(id, nama, jenis, harga_per_jam, status, deskripsi, foto, jam_buka, jam_tutup, soft_deletes, timestamps)
bookings(id, kode_booking, user_id, lapangan_id, tanggal, jam_mulai, jam_selesai,
         durasi_jam, total_harga, status_booking, catatan, timestamps)
payments(id, booking_id, metode, nominal, status_bayar, bukti_bayar,
         order_id, snap_token, transaction_id, payment_type, va_number, bank,
         fraud_status, raw_response, paid_at, expired_at, timestamps)
```
