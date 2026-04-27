import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api, extractError } from '../lib/api';

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  const [stats, setStats] = useState(null);
  const [statsError, setStatsError] = useState('');
  const [statsLoading, setStatsLoading] = useState(true);

  const [bookings, setBookings] = useState([]);
  const [bookingsError, setBookingsError] = useState('');
  const [bookingsLoading, setBookingsLoading] = useState(true);

  const [verifying, setVerifying] = useState(null);

  const handleLogout = async () => {
    await logout();
    window.location.replace('/');
  };

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
    <div className="bg-[#111827] font-sans antialiased text-white min-h-screen flex">
      {/* Sidebar */}
      <aside className={`sidebar-gradient w-64 fixed left-0 top-0 bottom-0 z-40 flex flex-col border-r border-white/5 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="px-6 py-6 border-b border-white/5">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path strokeWidth="2" d="M8 12l2-6h4l2 6-2 6h-4l-2-6z" />
              </svg>
            </div>
            <div>
              <span className="text-white text-lg font-bold tracking-tight block">GoalBox</span>
              <span className="text-gray-500 text-[10px] font-medium tracking-widest uppercase">Admin Panel</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white bg-white/5">
            <svg className="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            Dashboard
          </Link>
          <p className="text-[10px] uppercase tracking-widest text-gray-600 px-4 pt-4 pb-1">Segera</p>
          {['Kelola Lapangan', 'Kelola Booking', 'Pembayaran', 'Laporan'].map((label) => (
            <div key={label} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 cursor-not-allowed select-none">
              <span className="w-5 h-5 inline-flex items-center justify-center text-gray-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </span>
              {label}
            </div>
          ))}
        </nav>

        <div className="px-4 py-5 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 w-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16,17 21,12 16,7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      <main className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-30 bg-[#111827]/80 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center justify-between px-6 lg:px-8 h-16">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-xl font-bold text-white">Dashboard</h1>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/" className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors group">
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Beranda
              </Link>
              <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-white">{user?.name ?? 'Admin'}</p>
                  <p className="text-xs text-gray-500">{user?.role === 'admin' ? 'Super Admin' : 'User'}</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {(user?.name ?? 'A').charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-8">
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
                          <div className="text-gray-300 text-sm">{b.tanggal}</div>
                          <div className="text-gray-500 text-xs">{b.jam_mulai?.slice(0,5)} - {b.jam_selesai?.slice(0,5)}</div>
                        </td>
                        <td className="px-4 py-4"><span className="text-white text-sm font-semibold">Rp {formatRupiah(b.total_harga)}</span></td>
                        <td className="px-4 py-4">
                          <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${statusBadge[b.status_booking] ?? 'text-gray-400 bg-gray-400/10 border-gray-400/30'}`}>
                            {statusLabel[b.status_booking] ?? b.status_booking}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          {b.status_booking === 'menunggu_verifikasi' ? (
                            <div className="flex gap-1 justify-center">
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
                            </div>
                          ) : (
                            <span className="text-gray-600 text-xs">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
