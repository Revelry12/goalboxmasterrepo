import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { api } from '../lib/api';

const TABS = [
  { id: 'semua', label: 'Semua' },
  { id: 'aktif', label: 'Aktif' },
  { id: 'selesai', label: 'Selesai' },
  { id: 'dibatalkan', label: 'Dibatalkan' },
];

const BookingHistory = () => {
  const [activeTab, setActiveTab] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [bookingsData, setBookingsData] = useState({ data: [], total: 0, last_page: 1 });
  const [isLoading, setIsLoading] = useState(true);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // Reset to page 1 on new search
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    fetchBookings();
  }, [activeTab, debouncedSearch, page]);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/bookings', {
        params: {
          status: activeTab,
          search: debouncedSearch,
          page: page
        }
      });
      // The API returns { data: { current_page, data: [...], total, last_page, ... } }
      setBookingsData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (booking) => {
    const today = new Date().toISOString().split('T')[0];
    const isPast = booking.tanggal < today;

    if (booking.status_booking === 'cancelled' || booking.status_booking === 'expired') {
      return <span className="bg-red-900/40 text-red-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Dibatalkan</span>;
    }

    if (booking.status_booking === 'confirmed' && isPast) {
      return <span className="bg-gray-800 text-gray-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Selesai</span>;
    }

    if (['pending', 'menunggu_verifikasi', 'confirmed'].includes(booking.status_booking)) {
      if (booking.status_booking === 'pending') {
        return <span className="bg-orange-900/40 text-orange-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Belum Bayar</span>;
      }
      return <span className="bg-emerald-900/40 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Aktif</span>;
    }

    return <span className="bg-gray-800 text-gray-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">{booking.status_booking}</span>;
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  const formatDate = (dateStr) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="bg-[#0a1128] font-sans antialiased text-gray-300 min-h-screen flex flex-col">
      <Navbar className="bg-[#060d1f] border-b border-white/10 sticky top-0 z-50" />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-8 py-8 md:py-12">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Riwayat Booking</h1>
          <p className="text-gray-400 text-sm">Menampilkan {bookingsData.total} total pesanan</p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          {/* Tabs */}
          <div className="flex overflow-x-auto hide-scrollbar space-x-1 border-b border-white/10">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setPage(1); }}
                className={`whitespace-nowrap py-3 px-4 text-sm font-medium transition-colors border-b-2 ${activeTab === tab.id
                    ? 'border-brand-400 text-brand-400'
                    : 'border-transparent text-gray-400 hover:text-white hover:border-white/20'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Cari pesanan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#111a36] border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 transition-colors w-full md:w-64"
              />
            </div>
            <button className="bg-[#111a36] hover:bg-white/5 border border-white/5 text-gray-300 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Pilih Tanggal
            </button>
          </div>
        </div>

        {/* Booking List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="py-20 flex justify-center">
              <svg className="animate-spin w-8 h-8 text-brand-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : bookingsData.data && bookingsData.data.length > 0 ? (
            bookingsData.data.map((booking) => (
              <div key={booking.id} className="bg-[#111a36] border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row gap-5 hover:border-white/10 transition-colors group">
                {/* Image */}
                <div className="w-full md:w-48 h-32 bg-gray-800 rounded-xl overflow-hidden flex-shrink-0 relative">
                  <img src="/image.png" alt={booking.lapangan?.nama} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  {/* Overlay for cancelled */}
                  {['cancelled', 'expired'].includes(booking.status_booking) && (
                    <div className="absolute inset-0 bg-black/50 grayscale mix-blend-color"></div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                        <Link to={`/bookings/${booking.id}`}>{booking.lapangan?.nama}</Link>
                      </h3>
                      <div className="hidden md:block">{getStatusBadge(booking)}</div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      {formatDate(booking.tanggal)} | {booking.jam_mulai.substring(0, 5)} - {booking.jam_selesai.substring(0, 5)}
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-white/5 text-gray-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-white/10 uppercase tracking-widest">{booking.durasi_jam} Jam</span>
                      {booking.lapangan?.jenis && (
                        <span className="bg-white/5 text-gray-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-white/10 uppercase tracking-widest">{booking.lapangan.jenis}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-end justify-between mt-auto">
                    <span className="text-xl font-bold text-white">{formatRupiah(booking.total_harga)}</span>
                    <div className="md:hidden">{getStatusBadge(booking)}</div>
                  </div>
                </div>

                {/* Actions & ID */}
                <div className="md:w-48 flex flex-col items-end justify-between border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-5 mt-2 md:mt-0">
                  <span className="text-[10px] text-gray-500 font-mono tracking-widest mb-4 md:mb-0">#{booking.kode_booking}</span>

                  <div className="flex items-center gap-2 w-full md:w-auto">
                    {/* Render different buttons based on status */}
                    {(booking.status_booking === 'pending') && (
                      <Link to={`/bookings/${booking.id}`} className="flex-1 md:flex-none text-center bg-brand-600 hover:bg-brand-500 text-white font-medium text-xs px-4 py-2.5 rounded-lg transition-colors">
                        Bayar Sekarang
                      </Link>
                    )}

                    {['menunggu_verifikasi', 'confirmed'].includes(booking.status_booking) && (
                      <>
                        <button className="flex-1 md:flex-none text-center border border-white/10 hover:bg-white/5 text-gray-300 font-medium text-xs px-4 py-2.5 rounded-lg transition-colors">
                          Ajukan Refund
                        </button>
                        <Link to={`/bookings/${booking.id}`} className="flex-1 md:flex-none text-center bg-blue-100 hover:bg-white text-blue-900 font-bold text-xs px-4 py-2.5 rounded-lg transition-colors">
                          Lihat Tiket
                        </Link>
                      </>
                    )}

                    {(booking.status_booking === 'confirmed' && booking.tanggal < new Date().toISOString().split('T')[0]) && (
                      <>
                        <button className="flex-1 md:flex-none text-center border border-white/10 hover:bg-white/5 text-gray-300 font-medium text-xs px-4 py-2.5 rounded-lg transition-colors">
                          Beri Ulasan
                        </button>
                        <button className="flex-1 md:flex-none text-center bg-blue-100 hover:bg-white text-blue-900 font-bold text-xs px-4 py-2.5 rounded-lg transition-colors">
                          Pesan Lagi
                        </button>
                      </>
                    )}

                    {['cancelled', 'expired'].includes(booking.status_booking) && (
                      <p className="text-xs text-gray-500 italic text-right w-full">Pesanan telah dibatalkan atau kedaluwarsa</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-[#111a36] rounded-2xl border border-white/5">
              <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-white font-medium mb-1">Tidak ada pesanan</h3>
              <p className="text-gray-500 text-sm">Belum ada riwayat booking untuk kategori ini.</p>
            </div>
          )}
        </div>

        {/* Pagination Placeholder (Simplified) */}
        {!isLoading && bookingsData.last_page > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="w-8 h-8 rounded bg-[#111a36] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
            >
              &lt;
            </button>
            {Array.from({ length: bookingsData.last_page }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium transition-colors ${page === i + 1
                    ? 'bg-blue-100 text-blue-900'
                    : 'bg-[#111a36] border border-white/5 text-gray-400 hover:text-white'
                  }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={page === bookingsData.last_page}
              onClick={() => setPage(p => Math.min(bookingsData.last_page, p + 1))}
              className="w-8 h-8 rounded bg-[#111a36] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
            >
              &gt;
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BookingHistory;
