import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { api, extractError } from '../lib/api';

const formatRupiah = (n) => {
  const num = typeof n === 'string' ? parseFloat(n) : n;
  if (Number.isNaN(num)) return '0';
  return Math.round(num).toLocaleString('id-ID');
};

const jenisLabel = {
  vinyl: 'Vinyl',
  rumput_sintetis: 'Rumput Sintetis',
  interlock: 'Interlock',
  semen: 'Semen',
  parquet: 'Parquet',
};

const todayStr = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lapangan, setLapangan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [tanggal, setTanggal] = useState(todayStr());
  const [booked, setBooked] = useState([]);
  const [availLoading, setAvailLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.get(`/lapangan/${id}`)
      .then((res) => {
        if (!mounted) return;
        setLapangan(res.data?.data ?? null);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(extractError(err, 'Gagal memuat detail lapangan.'));
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, [id]);

  useEffect(() => {
    if (!lapangan?.id || !tanggal) return;
    let mounted = true;
    setAvailLoading(true);
    api.get(`/lapangan/${lapangan.id}/availability`, { params: { tanggal } })
      .then((res) => {
        if (!mounted) return;
        setBooked(res.data?.booked ?? []);
      })
      .catch(() => {
        if (mounted) setBooked([]);
      })
      .finally(() => {
        if (mounted) setAvailLoading(false);
      });
    return () => { mounted = false; };
  }, [lapangan?.id, tanggal]);

  const pricePerHour = useMemo(
    () => (lapangan?.harga_per_jam ? parseFloat(lapangan.harga_per_jam) : 0),
    [lapangan?.harga_per_jam]
  );

  if (loading) {
    return (
      <div className="bg-[#0a1128] min-h-screen flex items-center justify-center text-gray-400">
        Memuat detail lapangan...
      </div>
    );
  }

  if (error || !lapangan) {
    return (
      <div className="bg-[#0a1128] min-h-screen flex flex-col">
        <Navbar className="bg-[#060d1f] border-b border-white/10 sticky top-0 z-50" />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <p className="text-red-400 font-medium mb-3">{error || 'Lapangan tidak ditemukan.'}</p>
            <Link to="/" className="text-brand-400 hover:text-brand-300 text-sm">← Kembali ke Beranda</Link>
          </div>
        </div>
      </div>
    );
  }

  const jamBukaJam = parseInt((lapangan.jam_buka ?? '08:00:00').split(':')[0], 10);
  const jamTutupJam = parseInt((lapangan.jam_tutup ?? '23:00:00').split(':')[0], 10);

  const slots = [];
  for (let h = jamBukaJam; h < jamTutupJam; h++) {
    const start = `${String(h).padStart(2, '0')}:00`;
    const end = `${String(h + 1).padStart(2, '0')}:00`;
    const isBooked = booked.some(b => {
      const bs = b.jam_mulai?.slice(0, 5);
      const be = b.jam_selesai?.slice(0, 5);
      return bs && be && start < be && end > bs;
    });
    slots.push({ start, end, isBooked });
  }

  return (
    <div className="bg-[#0a1128] font-sans antialiased text-gray-300 flex flex-col min-h-screen">
      <Navbar className="bg-[#060d1f] border-b border-white/10 sticky top-0 z-50" />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8 mb-12">
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 transition-colors group"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Kembali
          </button>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-gray-500">
            <Link to="/" className="hover:text-white transition-colors">Beranda</Link>
            <span>/</span>
            <a href="/#lapangan" className="hover:text-white transition-colors">Lapangan</a>
            <span>/</span>
            <span className="text-brand-400" aria-current="page">{lapangan.nama}</span>
          </nav>
        </div>

        {/* Hero image */}
        <section className="rounded-2xl overflow-hidden h-[300px] md:h-[400px] mb-8 bg-gradient-to-br from-navy-800 to-navy-900">
          <img
            src={lapangan.foto || '/image.png'}
            alt={lapangan.nama}
            className="w-full h-full object-cover"
          />
        </section>

        <div className="grid lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2 space-y-8">
            <header className="border-b border-white/10 pb-6">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <h1 className="text-3xl font-bold text-white">{lapangan.nama}</h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-600/20 text-brand-300 px-2.5 py-1 rounded-full border border-brand-500/30">
                  {jenisLabel[lapangan.jenis] ?? lapangan.jenis}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" />
                  </svg>
                  <span>Buka {lapangan.jam_buka?.slice(0, 5)} - {lapangan.jam_tutup?.slice(0, 5)}</span>
                </div>
                <span className="text-gray-600">•</span>
                <span className="capitalize text-emerald-400">{lapangan.status}</span>
              </div>
            </header>

            {/* Description */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">Deskripsi</h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                {lapangan.deskripsi || 'Belum ada deskripsi untuk lapangan ini.'}
              </p>
            </section>

            {/* Availability */}
            <section>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <h2 className="text-lg font-bold text-white">Ketersediaan Jadwal</h2>
                <input
                  type="date"
                  min={todayStr()}
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  className="bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              {availLoading ? (
                <div className="text-gray-500 text-sm py-6 text-center">Mengecek ketersediaan...</div>
              ) : slots.length === 0 ? (
                <div className="text-gray-500 text-sm py-6 text-center">Jam operasional belum diatur.</div>
              ) : (
                <>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {slots.map((slot) => (
                      <div
                        key={slot.start}
                        className={`text-xs font-medium text-center py-2.5 rounded-lg border ${
                          slot.isBooked
                            ? 'bg-white/5 text-gray-500 border-transparent line-through'
                            : 'bg-brand-900/40 text-brand-300 border-brand-500/20'
                        }`}
                      >
                        {slot.start}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-[11px] font-medium text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-brand-500"></div>
                      <span>TERSEDIA</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full border border-gray-600"></div>
                      <span>SUDAH DIPESAN</span>
                    </div>
                  </div>
                </>
              )}
            </section>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-4">
              <div className="bg-gradient-to-br from-navy-900 to-[#111a36] border border-white/10 rounded-2xl p-6">
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-1">Harga Sewa</p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-3xl font-extrabold text-white">Rp {formatRupiah(pricePerHour)}</span>
                  <span className="text-sm text-gray-400 mb-1">/ jam</span>
                </div>

                <Link
                  to={`/booking/${lapangan.id}`}
                  className="w-full bg-brand-200 hover:bg-brand-300 text-brand-900 font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                  PESAN SEKARANG
                </Link>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                  <h4 className="text-sm font-semibold text-gray-300">Kebijakan Booking</h4>
                </div>
                <ul className="space-y-2 text-[11px] text-gray-400">
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-brand-400 mt-1.5"></div>
                    <span>Booking minimal durasi 1 jam (kelipatan 1 jam).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-brand-400 mt-1.5"></div>
                    <span>Pembayaran via transfer manual atau Midtrans.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-orange-400 mt-1.5"></div>
                    <span>Booking pending akan kedaluwarsa dalam 2 jam.</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Detail;
