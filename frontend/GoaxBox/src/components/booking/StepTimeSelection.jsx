import React, { useState, useMemo } from 'react';

const PRICE_PER_HOUR = 100000;

const ALL_SLOTS = [
  '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00',
  '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00',
  '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00',
  '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00',
  '20:00 - 21:00', '21:00 - 22:00', '22:00 - 23:00',
  '23:00 - 24:00',
];

const BOOKED_SLOTS = ['10:00 - 11:00', '14:00 - 15:00', '15:00 - 16:00'];

const DAYS_ID = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB'];
const MONTHS_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

const StepTimeSelection = ({ bookingData, setBookingData, onNext }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [weekOffset, setWeekOffset] = useState(0);

  // Compute the week's dates based on offset
  const weekDates = useMemo(() => {
    const startOfWeek = new Date(today);
    const dayOfWeek = startOfWeek.getDay(); // 0=Sun
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek + weekOffset * 7);
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(d.getDate() + i);
      dates.push(d);
    }
    return dates;
  }, [weekOffset]);

  const selectedDate = bookingData.date
    ? new Date(bookingData.date)
    : null;

  const selectedSlots = bookingData.slots || [];

  const handleDateSelect = (date) => {
    if (date < today) return;
    setBookingData(prev => ({
      ...prev,
      date: date.toISOString().split('T')[0],
      slots: [],
    }));
  };

  const handleSlotToggle = (slot) => {
    if (BOOKED_SLOTS.includes(slot)) return;
    setBookingData(prev => {
      const current = prev.slots || [];
      const isSelected = current.includes(slot);
      const updated = isSelected
        ? current.filter(s => s !== slot)
        : [...current, slot].sort();
      return { ...prev, slots: updated };
    });
  };

  const totalHours = selectedSlots.length;
  const totalPrice = totalHours * PRICE_PER_HOUR;

  const firstSlotStart = selectedSlots.length > 0
    ? selectedSlots[0].split(' - ')[0]
    : null;
  const lastSlotEnd = selectedSlots.length > 0
    ? selectedSlots[selectedSlots.length - 1].split(' - ')[1]
    : null;

  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return `${DAYS_ID[d.getDay()]}, ${d.getDate()} ${MONTHS_ID[d.getMonth()]} ${d.getFullYear()}`;
  };

  const formatRupiah = (val) =>
    'Rp ' + val.toLocaleString('id-ID');

  const monthLabel = useMemo(() => {
    if (weekDates.length === 0) return '';
    const first = weekDates[0];
    const last = weekDates[6];
    if (first.getMonth() === last.getMonth()) {
      return `${MONTHS_ID[first.getMonth()]} ${first.getFullYear()}`;
    }
    return `${MONTHS_ID[first.getMonth()]} – ${MONTHS_ID[last.getMonth()]} ${last.getFullYear()}`;
  }, [weekDates]);

  const canProceed = selectedDate && selectedSlots.length > 0;

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* Left Content */}
      <div className="lg:col-span-3 space-y-8">
        {/* Field Info Card */}
        <div className="bg-[#0d1b2a] border border-white/10 rounded-2xl p-5 flex items-center gap-5">
          <div className="w-24 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-navy-800">
            <img src="/image.png" alt="Lapangan" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">Lapangan Makmur Jaya</h2>
            <div className="flex items-center gap-1.5 text-gray-400 text-sm mt-1">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Jl. Raya Mekar Sari No. 123, Batam
            </div>
            <p className="text-brand-400 font-bold text-lg mt-2">
              Rp 100.000 <span className="text-gray-500 text-sm font-normal">/ jam</span>
            </p>
          </div>
        </div>

        {/* Calendar / Date Picker */}
        <div className="bg-[#0d1b2a] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white font-bold text-base">Pilih Tanggal</h3>
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm">{monthLabel}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setWeekOffset(prev => prev - 1)}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setWeekOffset(prev => prev + 1)}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Day headers & dates */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {DAYS_ID.map(day => (
              <div key={day} className="text-center text-gray-500 text-xs font-semibold uppercase tracking-wider py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {weekDates.map((date, i) => {
              const isPast = date < today;
              const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
              const isToday = date.toDateString() === today.toDateString();

              return (
                <button
                  key={i}
                  disabled={isPast}
                  onClick={() => handleDateSelect(date)}
                  className={`
                    relative h-12 rounded-xl text-sm font-semibold transition-all duration-200
                    ${isPast
                      ? 'text-gray-600 cursor-not-allowed'
                      : isSelected
                        ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30'
                        : isToday
                          ? 'bg-white/10 text-white border border-brand-500/50'
                          : 'text-gray-300 hover:bg-white/10 cursor-pointer'
                    }
                  `}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slots */}
        <div className="bg-[#0d1b2a] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white font-bold text-base">Pilih Slot Waktu</h3>
            <span className="text-gray-500 text-xs font-medium">Waktu operasional: 08:00 - 24:00</span>
          </div>

          {!selectedDate ? (
            <div className="text-center py-10 text-gray-500 text-sm">
              <svg className="w-10 h-10 mx-auto mb-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Silakan pilih tanggal terlebih dahulu
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-3">
                {ALL_SLOTS.map(slot => {
                  const isBooked = BOOKED_SLOTS.includes(slot);
                  const isSelected = selectedSlots.includes(slot);

                  return (
                    <button
                      key={slot}
                      disabled={isBooked}
                      onClick={() => handleSlotToggle(slot)}
                      className={`
                        py-3 px-4 rounded-xl text-sm font-semibold border transition-all duration-200
                        ${isBooked
                          ? 'bg-white/3 text-gray-600 border-white/5 cursor-not-allowed line-through'
                          : isSelected
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-md shadow-amber-500/10'
                            : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-white/20'
                        }
                      `}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>

              {selectedSlots.length > 0 && (
                <div className="flex items-center gap-2 mt-5 text-gray-400 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" />
                  </svg>
                  Durasi: {totalHours} jam | {selectedSlots.length} slot dipilih
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Right Sidebar - Order Summary */}
      <div className="lg:col-span-2">
        <div className="sticky top-28 space-y-4">
          <div className="bg-[#0d1b2a] border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-bold text-lg mb-5">Ringkasan Pesanan</h3>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-white font-semibold">Lapangan Makmur Jaya</p>
                <p className="text-gray-400 text-sm mt-1">{formatDateDisplay(bookingData.date)}</p>
                {firstSlotStart && (
                  <p className="text-brand-400 text-sm font-semibold mt-0.5">
                    {firstSlotStart} – {lastSlotEnd} ({totalHours} Jam)
                  </p>
                )}
              </div>

              {/* Edit icon */}
              <div className="flex items-center justify-end">
                <button className="text-gray-500 hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{totalHours} jam × Rp 100.000</span>
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

            <div className="flex items-center gap-2 mt-4 text-gray-400 text-xs">
              <svg className="w-4 h-4 text-brand-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Kebijakan Refund</span>
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
              Lanjut ke Data Pemesan
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>

          <button
            onClick={() => window.history.back()}
            className="w-full text-gray-400 hover:text-white text-sm font-medium py-2 transition-colors"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepTimeSelection;
