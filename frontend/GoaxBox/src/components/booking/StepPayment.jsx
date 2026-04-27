import React, { useState, useEffect, useRef } from 'react';

const MONTHS_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];
const DAYS_ID = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

const PAYMENT_METHODS = [
  {
    id: 'bank_transfer',
    name: 'Transfer Bank',
    desc: 'Verifikasi manual 10~15 menit',
    icon: (
      <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 7l10-5 10 5M4 10v8m4-8v8m4-8v8m4-8v8m4-8v8M2 19h20M2 7h20" />
      </svg>
    ),
  },
  {
    id: 'gopay',
    name: 'GoPay',
    desc: 'Instan via aplikasi Gojek',
    icon: (
      <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-extrabold text-xs">GO</div>
    ),
  },
  {
    id: 'ovo',
    name: 'OVO',
    desc: 'Konfirmasi instan via Push Notification',
    icon: (
      <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold text-xs">OVO</div>
    ),
  },
  {
    id: 'qris',
    name: 'QRIS',
    desc: 'Scan pakai m-banking/e-wallet',
    icon: (
      <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
];

const StepPayment = ({ bookingData, setBookingData, onNext, onBack }) => {
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  const totalHours = (bookingData.slots || []).length;
  const totalPrice = totalHours * 100000;
  const serviceFee = 5000;
  const grandTotal = totalPrice + serviceFee;
  const firstSlotStart = bookingData.slots?.length > 0 ? bookingData.slots[0].split(' - ')[0] : null;
  const lastSlotEnd = bookingData.slots?.length > 0 ? bookingData.slots[bookingData.slots.length - 1].split(' - ')[1] : null;

  const selectedMethod = bookingData.paymentMethod || 'bank_transfer';

  const formatRupiah = (val) => 'Rp ' + val.toLocaleString('id-ID');

  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return `${DAYS_ID[d.getDay()]}, ${d.getDate()} ${MONTHS_ID[d.getMonth()]} ${d.getFullYear()}`;
  };

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleMethodSelect = (id) => {
    setBookingData(prev => ({ ...prev, paymentMethod: id }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setUploadedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) setUploadedFile(file);
  };

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* Left Content */}
      <div className="lg:col-span-3 space-y-8">
        {/* Payment Methods */}
        <div>
          <h2 className="text-white font-bold text-xl mb-6">Metode Pembayaran</h2>
          <div className="grid grid-cols-2 gap-4">
            {PAYMENT_METHODS.map(method => (
              <button
                key={method.id}
                onClick={() => handleMethodSelect(method.id)}
                className={`relative bg-[#0d1b2a] border rounded-2xl p-5 text-left transition-all duration-200 ${
                  selectedMethod === method.id
                    ? 'border-brand-500 bg-brand-600/5'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Radio indicator */}
                <div className="absolute top-4 right-4">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    selectedMethod === method.id
                      ? 'border-brand-500 bg-brand-600'
                      : 'border-gray-600'
                  }`}>
                    {selectedMethod === method.id && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>

                <div className="mb-3">{method.icon}</div>
                <p className="text-white font-semibold text-sm">{method.name}</p>
                <p className="text-gray-500 text-xs mt-0.5">{method.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Bank Account Info (shown when bank_transfer selected) */}
        {selectedMethod === 'bank_transfer' && (
          <div>
            <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Informasi Rekening Tujuan
            </h4>
            <div className="bg-[#0d1b2a] border border-white/10 rounded-2xl p-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-blue-900/50 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Bank Central Asia (BCA)</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-white font-bold text-lg tracking-wider">1234 5678 99</span>
                    <button className="text-brand-400 text-xs font-semibold hover:text-brand-300 transition-colors">
                      Salin
                    </button>
                  </div>
                  <p className="text-gray-500 text-xs mt-0.5">PT GOALBOX TEKNOLOGI OLAHRAGA</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Proof */}
        {selectedMethod === 'bank_transfer' && (
          <div>
            <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Unggah Bukti Transfer
            </h4>
            <div
              className="bg-[#0d1b2a] border-2 border-dashed border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-brand-500/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={handleDrop}
            >
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
              {uploadedFile ? (
                <>
                  <svg className="w-10 h-10 text-emerald-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-white font-semibold text-sm">{uploadedFile.name}</p>
                  <p className="text-gray-500 text-xs mt-1">Klik untuk mengganti file</p>
                </>
              ) : (
                <>
                  <svg className="w-10 h-10 text-brand-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  <p className="text-white font-semibold text-sm">Klik untuk unggah atau seret file</p>
                  <p className="text-gray-500 text-xs mt-1">JPG, PNG atau PDF (Max. 5MB)</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar - Order Summary */}
      <div className="lg:col-span-2">
        <div className="sticky top-28 space-y-4">
          {/* Timer */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
              <span className="text-red-400 text-xs font-bold uppercase tracking-wider">Selesaikan Dalam</span>
            </div>
            <span className="text-red-400 font-extrabold text-xl tabular-nums">{formatTime(timeLeft)}</span>
          </div>

          <div className="bg-[#0d1b2a] border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-bold text-lg mb-5">Ringkasan Pesanan</h3>

            {/* Booking detail card */}
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-4 mb-5">
              <div className="w-16 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-navy-800">
                <img src="/image.png" alt="Lapangan" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Lapangan Makmur Jaya</p>
                <p className="text-gray-400 text-xs mt-0.5">{formatDateDisplay(bookingData.date)}</p>
                {firstSlotStart && (
                  <p className="text-brand-400 text-xs font-semibold mt-0.5">
                    {firstSlotStart} – {lastSlotEnd} ({totalHours} Jam)
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Sewa Lapangan ({totalHours} jam)</span>
                <span className="text-white font-medium">{formatRupiah(totalPrice)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Biaya Layanan</span>
                <span className="text-white font-medium">{formatRupiah(serviceFee)}</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 font-semibold">Total Pembayaran</span>
                <span className="text-white text-2xl font-extrabold">{formatRupiah(grandTotal)}</span>
              </div>
            </div>

            <button
              onClick={onNext}
              className="w-full mt-6 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-brand-600/25"
            >
              Konfirmasi Pembayaran
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            {/* Terms */}
            <div className="bg-white/5 rounded-xl p-3 mt-4 flex items-start gap-2.5">
              <svg className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <p className="text-gray-500 text-[11px] leading-relaxed">
                Dengan menekan tombol, Anda menyetujui <a href="#" className="text-brand-400 underline">Syarat & Ketentuan</a> GoalBox. Pembayaran Anda dilindungi dengan enkripsi SSL 256-bit.
              </p>
            </div>
          </div>

          <button
            onClick={onBack}
            className="w-full text-gray-400 hover:text-white text-sm font-medium py-2 transition-colors flex items-center justify-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Ganti Metode Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepPayment;
