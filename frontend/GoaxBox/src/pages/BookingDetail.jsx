import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { api, extractError } from '../lib/api';
import { useAuth } from '../context/AuthContext';

const BookingDetail = () => {
  const { id } = useParams();
  const { isAdmin } = useAuth();
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);

  const verifyBooking = async (keputusan) => {
    setVerifying(true);
    try {
      await api.post(`/admin/bookings/${booking.id}/verify`, { keputusan });
      const response = await api.get(`/bookings/${id}`);
      setBooking(response.data.data);
    } catch (err) {
      alert(extractError(err, 'Gagal memproses verifikasi.'));
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    const fetchBookingDetail = async () => {
      try {
        const response = await api.get(`/bookings/${id}`);
        setBooking(response.data.data);
      } catch (error) {
        console.error("Failed to fetch booking detail:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookingDetail();
  }, [id]);

  const getStatusBadge = () => {
    if (!booking) return null;
    const today = new Date().toISOString().split('T')[0];
    const isPast = booking.tanggal < today;

    if (booking.status_booking === 'cancelled' || booking.status_booking === 'expired') {
      return <span className="bg-red-900/40 text-red-400 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">Dibatalkan</span>;
    }

    if (booking.status_booking === 'confirmed' && isPast) {
      return <span className="bg-gray-800 text-gray-400 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">Selesai</span>;
    }

    if (booking.status_booking === 'pending') {
      return <span className="bg-orange-900/40 text-orange-400 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">Menunggu Pembayaran</span>;
    }

    if (booking.status_booking === 'menunggu_verifikasi') {
      return <span className="bg-blue-900/40 text-blue-400 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">Menunggu Verifikasi</span>;
    }

    return <span className="bg-emerald-900/40 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">Aktif</span>;
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  const formatDate = (dateStr) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('id-ID', options);
  };

  if (isLoading) {
    return (
      <div className="bg-[#0a1128] min-h-screen flex items-center justify-center">
        <svg className="animate-spin w-10 h-10 text-brand-500" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="bg-[#0a1128] font-sans antialiased text-gray-300 min-h-screen flex flex-col">
        <Navbar className="bg-[#060d1f] border-b border-white/10" />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Pesanan tidak ditemukan</h2>
            <Link to={isAdmin ? "/dashboard" : "/bookings"} className="text-brand-400 hover:text-brand-300">
              {isAdmin ? "Kembali ke Dashboard" : "Kembali ke Riwayat"}
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-[#0a1128] font-sans antialiased text-gray-300 min-h-screen flex flex-col">
      <Navbar className="bg-[#060d1f] border-b border-white/10 sticky top-0 z-50" />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 lg:px-8 py-8 md:py-12">
        {/* Back Link */}
        <Link to={isAdmin ? "/dashboard" : "/bookings"} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6 group">
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {isAdmin ? "Kembali ke Dashboard" : "Kembali ke Riwayat Booking"}
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Detail Pesanan</h1>
            <p className="text-gray-400 font-mono tracking-widest text-sm">#{booking.kode_booking}</p>
          </div>
          <div>
            {getStatusBadge()}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lapangan Info */}
            <div className="bg-[#111a36] rounded-2xl border border-white/5 overflow-hidden">
              <div className="h-48 w-full bg-gray-800 relative">
                <img src="/image.png" alt={booking.lapangan?.nama} className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111a36] to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <h3 className="text-2xl font-bold text-white mb-1">{booking.lapangan?.nama}</h3>
                  <p className="text-gray-300 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4 text-brand-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    Kota Jakarta Selatan
                  </p>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Jadwal Main</p>
                    <p className="text-white font-medium">{formatDate(booking.tanggal)}</p>
                    <p className="text-gray-400 text-sm">{booking.jam_mulai.substring(0, 5)} - {booking.jam_selesai.substring(0, 5)} ({booking.durasi_jam} Jam)</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Tipe Lapangan</p>
                    <p className="text-white font-medium">{booking.lapangan?.jenis || 'Sintetis'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-[#111a36] rounded-2xl border border-white/5 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Rincian Pembayaran</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Harga Sewa ({booking.durasi_jam} Jam)</span>
                  <span className="text-white">{formatRupiah(booking.total_harga)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Biaya Layanan</span>
                  <span className="text-white">Gratis</span>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                  <span className="text-gray-300 font-bold">Total Pembayaran</span>
                  <span className="text-xl font-bold text-brand-400">{formatRupiah(booking.total_harga)}</span>
                </div>
              </div>

              <div className="bg-[#0a1128] rounded-xl p-4 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Metode Pembayaran</p>
                  <p className="text-white font-medium capitalize">
                    {booking.payment?.metode === 'midtrans' ? 'Otomatis (Midtrans)' : 'Transfer Manual'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Status Pembayaran</p>
                  <span className={`inline-block px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${booking.payment?.status_bayar === 'success' || booking.payment?.status_bayar === 'settlement' ? 'bg-emerald-900/40 text-emerald-400' :
                      booking.payment?.status_bayar === 'pending' ? 'bg-orange-900/40 text-orange-400' : 'bg-red-900/40 text-red-400'
                    }`}>
                    {booking.payment?.status_bayar || 'PENDING'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Ticket / Actions */}
            <div className="bg-[#111a36] rounded-2xl border border-white/5 p-6 flex flex-col items-center">
              {isAdmin ? (
                /* Admin View */
                <>
                  <div className="w-16 h-16 rounded-full bg-blue-900/40 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-400 text-center mb-6">
                    Aksi Admin untuk status <strong className="text-white uppercase">{booking.status_booking}</strong>
                  </p>

                  {booking.status_booking === 'menunggu_verifikasi' && (
                    <div className="w-full space-y-3">
                      <button
                        disabled={verifying}
                        onClick={() => verifyBooking('approve')}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
                      >
                        Terima Verifikasi
                      </button>
                      <button
                        disabled={verifying}
                        onClick={() => verifyBooking('reject')}
                        className="w-full border border-red-500/30 text-red-400 hover:bg-red-500/10 font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
                      >
                        Tolak Verifikasi
                      </button>
                    </div>
                  )}

                  {['pending', 'confirmed', 'cancelled', 'expired'].includes(booking.status_booking) && (
                    <div className="w-full text-center bg-white/5 rounded-xl py-3 border border-white/10 text-gray-400 text-sm">
                      Tidak ada aksi lanjutan
                    </div>
                  )}
                </>
              ) : (
                /* Customer View */
                <>
                  {booking.status_booking === 'confirmed' ? (
                    <>
                      <div className="bg-white p-2 rounded-xl mb-4">
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${booking.kode_booking}`} alt="Ticket QR" className="w-32 h-32" />
                      </div>
                      <p className="text-sm text-gray-400 text-center mb-6">Tunjukkan QR code ini ke petugas lapangan saat Anda tiba.</p>
                      <button className="w-full bg-blue-100 hover:bg-white text-blue-900 font-bold py-3 rounded-xl transition-colors">
                        Unduh Tiket
                      </button>
                    </>
                  ) : booking.status_booking === 'pending' ? (
                    <>
                      <div className="w-16 h-16 rounded-full bg-orange-900/40 flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-400 text-center mb-6">Silakan selesaikan pembayaran agar pesanan dapat dikonfirmasi.</p>
                      <button className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 rounded-xl transition-colors mb-3">
                        Bayar Sekarang
                      </button>
                      <button className="w-full border border-white/10 hover:bg-white/5 text-gray-300 font-medium py-3 rounded-xl transition-colors">
                        Batalkan Pesanan
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-400 text-center mb-6">
                        Pesanan ini berstatus <strong className="text-white uppercase">{booking.status_booking}</strong>.
                      </p>
                      {(booking.status_booking === 'cancelled' || booking.status_booking === 'expired') && (
                        <Link to="/" className="w-full text-center bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 rounded-xl transition-colors block">
                          Pesan Lapangan Baru
                        </Link>
                      )}
                    </>
                  )}
                </>
              )}
            </div>

            {/* Customer Info */}
            <div className="bg-[#111a36] rounded-2xl border border-white/5 p-6">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Informasi Pemesan</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Nama</p>
                  <p className="text-white text-sm font-medium">{booking.user?.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <p className="text-white text-sm font-medium">{booking.user?.email}</p>
                </div>
                {booking.catatan && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Catatan Tambahan</p>
                    <p className="text-white text-sm font-medium">{booking.catatan}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingDetail;
