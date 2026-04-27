import React from 'react';
import { Link } from 'react-router-dom';

const MONTHS_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];
const DAYS_ID = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

const StepConfirmation = ({ bookingData }) => {
  const totalHours = (bookingData.slots || []).length;
  const firstSlotStart = bookingData.slots?.length > 0 ? bookingData.slots[0].split(' - ')[0] : null;
  const lastSlotEnd = bookingData.slots?.length > 0 ? bookingData.slots[bookingData.slots.length - 1].split(' - ')[1] : null;

  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return `${DAYS_ID[d.getDay()]}, ${d.getDate()} ${MONTHS_ID[d.getMonth()]} ${d.getFullYear()}`;
  };

  // Generate dummy booking code
  const bookingCode = `GBX-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="max-w-2xl mx-auto text-center">
      {/* Success Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-2xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center animate-bounce-slow">
          <svg className="w-10 h-10 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
        Booking Berhasil!
      </h1>
      <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto mb-10">
        Pesanan Anda telah dikonfirmasi. Tunjukkan QR Code di bawah ini saat tiba di lokasi untuk akses masuk lapangan.
      </p>

      {/* Ticket Card */}
      <div className="bg-[#0d1b2a] border border-white/10 rounded-2xl overflow-hidden text-left">
        <div className="grid md:grid-cols-5">
          {/* Left: Booking Details */}
          <div className="md:col-span-3 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-5">
              <svg className="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Ringkasan Pesanan</span>
            </div>

            <h2 className="text-white font-bold text-xl mb-5">Lapangan Makmur Jaya</h2>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-[11px] font-medium uppercase tracking-wider">Tanggal Main</p>
                  <p className="text-white font-semibold text-sm">{formatDateDisplay(bookingData.date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-[11px] font-medium uppercase tracking-wider">Waktu Sesi</p>
                  <p className="text-white font-semibold text-sm">
                    {firstSlotStart} – {lastSlotEnd} ({totalHours} Jam)
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div>
                <p className="text-gray-500 text-[11px] font-medium uppercase tracking-wider mb-1">Kode Booking</p>
                <p className="text-brand-400 font-extrabold text-lg tracking-wide">{bookingCode}</p>
              </div>
              <div>
                <p className="text-gray-500 text-[11px] font-medium uppercase tracking-wider mb-1">Status Pembayaran</p>
                <span className="text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 text-xs font-bold px-3 py-1.5 rounded-full">
                  LUNAS
                </span>
              </div>
            </div>
          </div>

          {/* Right: QR Code */}
          <div className="md:col-span-2 bg-white/5 border-l border-white/10 p-6 md:p-8 flex flex-col items-center justify-center">
            {/* Dummy QR Code SVG */}
            <div className="w-40 h-40 bg-white rounded-xl p-3 mb-4">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Simplified QR code pattern */}
                <rect x="0" y="0" width="100" height="100" fill="white" />
                {/* Top-left position marker */}
                <rect x="5" y="5" width="25" height="25" fill="black" />
                <rect x="9" y="9" width="17" height="17" fill="white" />
                <rect x="12" y="12" width="11" height="11" fill="black" />
                {/* Top-right position marker */}
                <rect x="70" y="5" width="25" height="25" fill="black" />
                <rect x="74" y="9" width="17" height="17" fill="white" />
                <rect x="77" y="12" width="11" height="11" fill="black" />
                {/* Bottom-left position marker */}
                <rect x="5" y="70" width="25" height="25" fill="black" />
                <rect x="9" y="74" width="17" height="17" fill="white" />
                <rect x="12" y="77" width="11" height="11" fill="black" />
                {/* Data area - random pattern */}
                <rect x="35" y="5" width="5" height="5" fill="black" />
                <rect x="45" y="5" width="5" height="5" fill="black" />
                <rect x="55" y="5" width="5" height="5" fill="black" />
                <rect x="35" y="15" width="5" height="5" fill="black" />
                <rect x="50" y="15" width="5" height="5" fill="black" />
                <rect x="60" y="15" width="5" height="5" fill="black" />
                <rect x="40" y="25" width="5" height="5" fill="black" />
                <rect x="50" y="25" width="5" height="5" fill="black" />
                <rect x="5" y="35" width="5" height="5" fill="black" />
                <rect x="15" y="35" width="5" height="5" fill="black" />
                <rect x="25" y="35" width="5" height="5" fill="black" />
                <rect x="35" y="35" width="5" height="5" fill="black" />
                <rect x="50" y="35" width="5" height="5" fill="black" />
                <rect x="65" y="35" width="5" height="5" fill="black" />
                <rect x="80" y="35" width="5" height="5" fill="black" />
                <rect x="90" y="35" width="5" height="5" fill="black" />
                <rect x="10" y="45" width="5" height="5" fill="black" />
                <rect x="20" y="45" width="5" height="5" fill="black" />
                <rect x="40" y="45" width="5" height="5" fill="black" />
                <rect x="55" y="45" width="5" height="5" fill="black" />
                <rect x="70" y="45" width="5" height="5" fill="black" />
                <rect x="85" y="45" width="5" height="5" fill="black" />
                <rect x="5" y="55" width="5" height="5" fill="black" />
                <rect x="25" y="55" width="5" height="5" fill="black" />
                <rect x="35" y="55" width="5" height="5" fill="black" />
                <rect x="45" y="55" width="5" height="5" fill="black" />
                <rect x="60" y="55" width="5" height="5" fill="black" />
                <rect x="75" y="55" width="5" height="5" fill="black" />
                <rect x="90" y="55" width="5" height="5" fill="black" />
                <rect x="15" y="65" width="5" height="5" fill="black" />
                <rect x="35" y="65" width="5" height="5" fill="black" />
                <rect x="50" y="65" width="5" height="5" fill="black" />
                <rect x="65" y="65" width="5" height="5" fill="black" />
                <rect x="80" y="65" width="5" height="5" fill="black" />
                <rect x="35" y="75" width="5" height="5" fill="black" />
                <rect x="45" y="75" width="5" height="5" fill="black" />
                <rect x="55" y="75" width="5" height="5" fill="black" />
                <rect x="70" y="75" width="5" height="5" fill="black" />
                <rect x="85" y="75" width="5" height="5" fill="black" />
                <rect x="40" y="85" width="5" height="5" fill="black" />
                <rect x="55" y="85" width="5" height="5" fill="black" />
                <rect x="65" y="85" width="5" height="5" fill="black" />
                <rect x="75" y="85" width="5" height="5" fill="black" />
                <rect x="90" y="85" width="5" height="5" fill="black" />
                <rect x="35" y="90" width="5" height="5" fill="black" />
                <rect x="50" y="90" width="5" height="5" fill="black" />
                <rect x="60" y="90" width="5" height="5" fill="black" />
                <rect x="80" y="90" width="5" height="5" fill="black" />
              </svg>
            </div>
            <p className="text-gray-500 text-xs text-center leading-relaxed">
              Pindai kode ini pada turnstile di pintu masuk stadion.
            </p>
            <div className="flex items-center gap-1 mt-4 text-gray-600 text-[10px]">
              <span>•••</span>
            </div>
            <p className="text-gray-600 text-[10px] uppercase tracking-widest mt-1">Powered by GoalBox Kinetics</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
        <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm px-8 py-3.5 rounded-xl transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Unduh Tiket PDF
        </button>
        <Link
          to="/dashboard"
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-brand-600/25"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
          </svg>
          Lihat Riwayat Booking
        </Link>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white text-sm font-medium mt-6 transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default StepConfirmation;
