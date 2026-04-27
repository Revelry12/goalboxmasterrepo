import React from 'react';

const MONTHS_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];
const DAYS_ID = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

const StepReviewData = ({ bookingData, setBookingData, onNext, onBack }) => {
  const totalHours = (bookingData.slots || []).length;
  const totalPrice = totalHours * 100000;
  const firstSlotStart = bookingData.slots?.length > 0 ? bookingData.slots[0].split(' - ')[0] : null;
  const lastSlotEnd = bookingData.slots?.length > 0 ? bookingData.slots[bookingData.slots.length - 1].split(' - ')[1] : null;

  const formatRupiah = (val) => 'Rp ' + val.toLocaleString('id-ID');

  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return `${DAYS_ID[d.getDay()]}, ${d.getDate()} ${MONTHS_ID[d.getMonth()]} ${d.getFullYear()}`;
  };

  const handleChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      customer: { ...prev.customer, [field]: value },
    }));
  };

  const customer = bookingData.customer || {};
  const canProceed = customer.name?.trim() && customer.phone?.trim() && customer.email?.trim();

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* Left Content */}
      <div className="lg:col-span-3 space-y-8">
        <div className="bg-[#0d1b2a] border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-bold text-xl mb-6">Data Pemesan</h2>

          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-2 block">
                Nama Lengkap <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={customer.name || ''}
                onChange={e => handleChange('name', e.target.value)}
                placeholder="Masukkan nama lengkap"
                className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-2 block">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                value={customer.email || ''}
                onChange={e => handleChange('email', e.target.value)}
                placeholder="contoh@email.com"
                className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-2 block">
                Nomor Telepon <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                value={customer.phone || ''}
                onChange={e => handleChange('phone', e.target.value)}
                placeholder="08xxxxxxxxxx"
                className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-2 block">
                Catatan Tambahan
              </label>
              <textarea
                value={customer.notes || ''}
                onChange={e => handleChange('notes', e.target.value)}
                placeholder="Catatan khusus untuk pengelola (opsional)"
                rows="3"
                className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-brand-500 transition-colors resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Order Summary */}
      <div className="lg:col-span-2">
        <div className="sticky top-28 space-y-4">
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
                <span className="text-emerald-400 font-medium">Gratis</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 font-semibold">Total Pembayaran</span>
                <span className="text-white text-2xl font-extrabold">{formatRupiah(totalPrice)}</span>
              </div>
            </div>

            <button
              disabled={!canProceed}
              onClick={onNext}
              className={`w-full mt-6 font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm ${
                canProceed
                  ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-600/25'
                  : 'bg-white/5 text-gray-600 cursor-not-allowed'
              }`}
            >
              Lanjut ke Pembayaran
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>

          <button
            onClick={onBack}
            className="w-full text-gray-400 hover:text-white text-sm font-medium py-2 transition-colors"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepReviewData;
