import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, extractError } from '../lib/api';
import AdminLayout from '../components/AdminLayout';
import dayjs from 'dayjs';

const formatRupiah = (n) => {
  const num = typeof n === 'string' ? parseFloat(n) : n;
  if (Number.isNaN(num)) return '0';
  return Math.round(num).toLocaleString('id-ID');
};

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

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [statsError, setStatsError] = useState('');
  const [statsLoading, setStatsLoading] = useState(true);

  const [bookings, setBookings] = useState([]);
  const [bookingsError, setBookingsError] = useState('');
  const [bookingsLoading, setBookingsLoading] = useState(true);

  const [verifying, setVerifying] = useState(null);

  const loadStats = () => {
    setStatsLoading(true);
    setStatsError('');
    api.get('/admin/dashboard')
      .then((res) => setStats(res.data))
      .catch((err) => setStatsError(extractError(err, 'Gagal memuat statistik.')))
      .finally(() => setStatsLoading(false));
  };

  const loadBookings = () => {
    setBookingsLoading(true);
    setBookingsError('');
    api.get('/admin/bookings')
      .then((res) => setBookings(res.data?.data?.data ?? []))
      .catch((err) => setBookingsError(extractError(err, 'Gagal memuat booking.')))
      .finally(() => setBookingsLoading(false));
  };

  useEffect(() => {
    loadStats();
    loadBookings();
  }, []);

  const verifyBooking = async (booking, keputusan) => {
    setVerifying(booking.id);
    try {
      await api.post(`/admin/bookings/${booking.id}/verify`, { keputusan });
      loadBookings();
      loadStats();
    } catch (err) {
      alert(extractError(err, 'Gagal verifikasi.'));
    } finally {
      setVerifying(null);
    }
  };

  const statCards = [
    { label: 'Total Booking', value: stats?.total_booking ?? '-', accent: 'bg-brand-600/15 text-brand-400' },
    { label: 'Booking Hari Ini', value: stats?.booking_hari_ini ?? '-', accent: 'bg-emerald-600/15 text-emerald-400' },
    { label: 'Menunggu Verifikasi', value: stats?.menunggu_verifikasi ?? '-', accent: 'bg-yellow-600/15 text-yellow-400' },
    { label: 'Pendapatan Bulan Ini', value: stats ? `Rp ${formatRupiah(stats.pendapatan_bulan_ini)}` : '-', accent: 'bg-purple-600/15 text-purple-400' },
  ];

  return (
    <AdminLayout title="Dashboard">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="bg-[#1a2332] rounded-2xl p-5 border border-white/5">
            <div className={`w-11 h-11 rounded-xl ${card.accent} flex items-center justify-center mb-4`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              </svg>
            </div>
            <p className="text-gray-400 text-xs font-semibold tracking-wider uppercase mb-1">{card.label}</p>
            <p className="text-3xl font-extrabold text-white">
              {statsLoading ? '...' : card.value}
            </p>
          </div>
        ))}
      </div>

      {statsError && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
          {statsError}
        </div>
      )}

      {/* Bookings table */}
      <div className="bg-[#1a2332] rounded-2xl border border-white/5 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <h2 className="text-lg font-bold text-white">Booking Terbaru</h2>
          <button onClick={loadBookings} className="text-brand-400 text-sm font-medium hover:text-brand-300">
            Refresh
          </button>
        </div>

        {bookingsLoading && (
          <div className="text-center py-12 text-gray-500 text-sm">Memuat booking...</div>
        )}

        {!bookingsLoading && bookingsError && (
          <div className="text-center py-12 text-red-400 text-sm">{bookingsError}</div>
        )}

        {!bookingsLoading && !bookingsError && bookings.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">Belum ada booking.</div>
        )}

        {!bookingsLoading && !bookingsError && bookings.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-500 text-xs font-semibold uppercase tracking-wider border-b border-white/5">
                  <th className="text-left px-6 py-4">Kode</th>
                  <th className="text-left px-4 py-4">User</th>
                  <th className="text-left px-4 py-4">Lapangan</th>
                  <th className="text-left px-4 py-4">Tgl & Jam</th>
                  <th className="text-left px-4 py-4">Total</th>
                  <th className="text-left px-4 py-4">Status</th>
                  <th className="text-center px-4 py-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4"><span className="text-brand-400 font-bold text-sm font-mono">{b.kode_booking}</span></td>
                    <td className="px-4 py-4"><span className="text-white text-sm">{b.user?.name ?? '-'}</span></td>
                    <td className="px-4 py-4"><span className="text-gray-300 text-sm">{b.lapangan?.nama ?? '-'}</span></td>
                    <td className="px-4 py-4">
                      <div className="text-gray-300 text-sm">{dayjs(b.tanggal).format('DD-MM-YYYY')}</div>
                      <div className="text-gray-500 text-xs">{b.jam_mulai?.slice(0, 5)} - {b.jam_selesai?.slice(0, 5)}</div>
                    </td>
                    <td className="px-4 py-4"><span className="text-white text-sm font-semibold">Rp {formatRupiah(b.total_harga)}</span></td>
                    <td className="px-4 py-4">
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${statusBadge[b.status_booking] ?? 'text-gray-400 bg-gray-400/10 border-gray-400/30'}`}>
                        {statusLabel[b.status_booking] ?? b.status_booking}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex gap-2 justify-center items-center">
                        <Link
                          to={`/bookings/${b.id}`}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                        >
                          Detail
                        </Link>
                        {b.status_booking === 'menunggu_verifikasi' && (
                          <>
                            <button
                              disabled={verifying === b.id}
                              onClick={() => verifyBooking(b, 'approve')}
                              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white"
                            >
                              Approve
                            </button>
                            <button
                              disabled={verifying === b.id}
                              onClick={() => verifyBooking(b, 'reject')}
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
    </AdminLayout>
  );
};

export default Dashboard;
