import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { api, extractError } from '../../lib/api';
import dayjs from 'dayjs';

const statusBadge = {
  pending: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  menunggu_verifikasi: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
  confirmed: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
  cancelled: 'text-red-400 bg-red-400/10 border-red-400/30',
  expired: 'text-gray-400 bg-gray-400/10 border-gray-400/30',
};

const statusLabel = {
  pending: 'Pending',
  menunggu_verifikasi: 'Menunggu Verifikasi',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
  expired: 'Expired',
};

const TABS = [
  { id: 'semua', label: 'Semua' },
  { id: 'confirmed', label: 'Confirmed' },
  { id: 'menunggu_verifikasi', label: 'Menunggu Verifikasi' },
  { id: 'pending', label: 'Pending' },
  { id: 'cancelled', label: 'Cancelled' },
];

const formatRupiah = (n) => `Rp ${Math.round(n).toLocaleString('id-ID')}`;

const KelolaBooking = () => {
  const [activeTab, setActiveTab] = useState('semua');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [bookings, setBookings] = useState([]);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1, total: 0 });
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [verifying, setVerifying] = useState(null);

  // Stats counters
  const [stats, setStats] = useState({ total: 0, confirmed: 0, menunggu: 0, dibatalkan: 0 });

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch bookings
  useEffect(() => {
    fetchBookings();
  }, [activeTab, debouncedSearch, page]);

  // Fetch stats on mount
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch counts per status using separate calls
      const [allRes, confirmedRes, menungguRes, cancelledRes] = await Promise.all([
        api.get('/admin/bookings', { params: { per_page: 1 } }),
        api.get('/admin/bookings', { params: { status: 'confirmed', per_page: 1 } }),
        api.get('/admin/bookings', { params: { status: 'menunggu_verifikasi', per_page: 1 } }),
        api.get('/admin/bookings', { params: { status: 'cancelled', per_page: 1 } }),
      ]);
      setStats({
        total: allRes.data?.data?.total ?? 0,
        confirmed: confirmedRes.data?.data?.total ?? 0,
        menunggu: menungguRes.data?.data?.total ?? 0,
        dibatalkan: cancelledRes.data?.data?.total ?? 0,
      });
    } catch {
      // silent fail for stats
    }
  };

  const fetchBookings = async () => {
    setIsLoading(true);
    setError('');
    try {
      const params = { page };
      if (activeTab !== 'semua') params.status = activeTab;
      // AdminBookingController doesn't have search built in, so we filter client-side
      const response = await api.get('/admin/bookings', { params });
      const data = response.data?.data;
      setBookings(data?.data ?? []);
      setPagination({
        current_page: data?.current_page ?? 1,
        last_page: data?.last_page ?? 1,
        total: data?.total ?? 0,
      });
    } catch (err) {
      setError(extractError(err, 'Gagal memuat data booking.'));
    } finally {
      setIsLoading(false);
    }
  };

  const verifyBooking = async (bookingId, keputusan) => {
    setVerifying(bookingId);
    try {
      await api.post(`/admin/bookings/${bookingId}/verify`, { keputusan });
      fetchBookings();
      fetchStats();
    } catch (err) {
      alert(extractError(err, 'Gagal memproses verifikasi.'));
    } finally {
      setVerifying(null);
    }
  };

  // Client-side search filter (since the admin API doesn't have a search param)
  const filtered = debouncedSearch
    ? bookings.filter((b) =>
      b.kode_booking?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        b.user?.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        b.lapangan?.nama?.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
    : bookings;

  return (
    <AdminLayout title="Kelola Booking">
      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total', value: stats.total, color: 'text-brand-400 bg-brand-600/15' },
          { label: 'Confirmed', value: stats.confirmed, color: 'text-emerald-400 bg-emerald-600/15' },
          { label: 'Menunggu', value: stats.menunggu, color: 'text-orange-400 bg-orange-600/15' },
          { label: 'Dibatalkan', value: stats.dibatalkan, color: 'text-red-400 bg-red-600/15' },
        ].map((s) => (
          <div key={s.label} className="bg-[#1a2332] rounded-xl p-4 border border-white/5 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center text-lg font-bold`}>{s.value}</div>
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
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
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Cari kode, user, lapangan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#1a2332] border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 transition-colors w-full md:w-72"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1a2332] rounded-2xl border border-white/5 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <svg className="animate-spin w-8 h-8 text-brand-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-400 text-sm">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-500 text-xs font-semibold uppercase tracking-wider border-b border-white/5">
                  <th className="text-left px-6 py-4">Kode Booking</th>
                  <th className="text-left px-4 py-4">Pemesan</th>
                  <th className="text-left px-4 py-4">Lapangan</th>
                  <th className="text-left px-4 py-4">Jadwal</th>
                  <th className="text-left px-4 py-4">Metode</th>
                  <th className="text-left px-4 py-4">Total</th>
                  <th className="text-left px-4 py-4">Status</th>
                  <th className="text-center px-4 py-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan="8" className="text-center py-12 text-gray-500 text-sm">Tidak ada data booking ditemukan.</td></tr>
                ) : filtered.map((b) => (
                  <tr key={b.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                    <td className="px-6 py-4"><span className="text-brand-400 font-bold text-sm font-mono">{b.kode_booking}</span></td>
                    <td className="px-4 py-4">
                      <div className="text-white text-sm font-medium">{b.user?.name ?? '-'}</div>
                      <div className="text-gray-500 text-xs">{b.user?.email ?? '-'}</div>
                    </td>
                    <td className="px-4 py-4"><span className="text-gray-300 text-sm">{b.lapangan?.nama ?? '-'}</span></td>
                    <td className="px-4 py-4">
                      <div className="text-gray-300 text-sm">{dayjs(b.tanggal).format('DD-MM-YYYY')}</div>
                      <div className="text-gray-500 text-xs">{b.jam_mulai?.slice(0, 5)} - {b.jam_selesai?.slice(0, 5)}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${b.payment?.metode === 'midtrans' ? 'bg-blue-500/10 text-blue-400' : 'bg-white/5 text-gray-400'}`}>
                        {b.payment?.metode === 'midtrans' ? 'Midtrans' : 'Transfer Manual'}
                      </span>
                    </td>
                    <td className="px-4 py-4"><span className="text-white text-sm font-semibold">{formatRupiah(b.total_harga)}</span></td>
                    <td className="px-4 py-4">
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${statusBadge[b.status_booking] ?? 'text-gray-400 bg-gray-400/10 border-gray-400/30'}`}>
                        {statusLabel[b.status_booking] ?? b.status_booking}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex gap-2 justify-center items-center">
                        <Link to={`/bookings/${b.id}`} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors">
                          Detail
                        </Link>
                        {b.status_booking === 'menunggu_verifikasi' && (
                          <>
                            <button
                              disabled={verifying === b.id}
                              onClick={() => verifyBooking(b.id, 'approve')}
                              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white"
                            >
                              Approve
                            </button>
                            <button
                              disabled={verifying === b.id}
                              onClick={() => verifyBooking(b.id, 'reject')}
                              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && !error && pagination.last_page > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className="w-8 h-8 rounded bg-[#1a2332] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
          >
            &lt;
          </button>
          {Array.from({ length: pagination.last_page }).map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium transition-colors ${page === i + 1
                ? 'bg-blue-100 text-blue-900'
                : 'bg-[#1a2332] border border-white/5 text-gray-400 hover:text-white'
                }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={page === pagination.last_page}
            onClick={() => setPage(p => Math.min(pagination.last_page, p + 1))}
            className="w-8 h-8 rounded bg-[#1a2332] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
          >
            &gt;
          </button>
        </div>
      )}
    </AdminLayout>
  );
};

export default KelolaBooking;
