import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

const Landing = () => {
  const [lapanganList, setLapanganList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    api.get('/lapangan')
      .then((res) => {
        if (!mounted) return;
        setLapanganList(res.data?.data?.data ?? []);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(extractError(err, 'Gagal memuat daftar lapangan.'));
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  const caraPesan = [
    {
      title: 'Pilih Lapangan',
      desc: 'Cari lapangan terbaik sesuai jenis dan jam yang tersedia.',
      icon: (
        <>
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </>
      ),
    },
    {
      title: 'Pilih Jadwal',
      desc: 'Tentukan tanggal dan jam yang sesuai keinginanmu.',
      icon: (
        <>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </>
      ),
    },
    {
      title: 'Bayar',
      desc: 'Pilih transfer manual atau pembayaran via Midtrans.',
      icon: (
        <>
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </>
      ),
    },
    {
      title: 'Main!',
      desc: 'Tunjukkan kode booking di lokasi dan selamat bermain.',
      icon: (
        <>
          <circle cx="12" cy="12" r="10" />
          <polygon points="10,8 16,12 10,16" fill="currentColor" />
        </>
      ),
    },
  ];

  return (
    <div className="bg-[#0a1128] font-sans antialiased text-gray-300 flex flex-col min-h-screen">
      <Navbar />

      {/* HERO */}
      <section id="beranda" className="hero-gradient relative min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-brand-500/3 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-36 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-600/15 border border-brand-500/20 rounded-full px-4 py-1.5 mb-8">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
                <span className="text-brand-300 text-xs font-semibold tracking-wide uppercase">Booking Lapangan Online</span>
              </div>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight mb-6">
                Pesan Lapangan<br />
                Futsal <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-400">Kapan Saja</span>
              </h1>

              <p className="text-gray-400 text-lg leading-relaxed max-w-lg mb-8">
                Nikmati kemudahan booking lapangan futsal terbaik di kotamu. Proses cepat dan terpercaya untuk performa maksimalmu di lapangan.
              </p>

              <button
                className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl text-sm"
                onClick={() => document.getElementById('lapangan')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                Lihat Lapangan
              </button>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-full h-[400px] rounded-3xl bg-gradient-to-br from-navy-800 to-navy-950 border border-white/10 overflow-hidden">
                  <img src="/image.png" alt="Hero" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-brand-600/20 rounded-full blur-3xl"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COURTS */}
      <section id="lapangan" className="bg-[#0a1128] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">Lapangan Tersedia</h2>
            <p className="text-gray-400 text-base">Pilih lapangan dan langsung pesan jadwalmu</p>
          </div>

          {loading && (
            <div className="text-center py-16 text-gray-400">Memuat lapangan...</div>
          )}

          {!loading && error && (
            <div className="text-center py-16 bg-red-900/20 border border-red-500/30 rounded-2xl">
              <p className="text-red-400 font-medium mb-2">{error}</p>
              <p className="text-gray-500 text-sm">Pastikan backend Laravel berjalan di {import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}</p>
            </div>
          )}

          {!loading && !error && lapanganList.length === 0 && (
            <div className="text-center py-16 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-gray-300 font-medium">Belum ada lapangan aktif</p>
              <p className="text-gray-500 text-sm mt-2">Admin perlu menambahkan lapangan terlebih dahulu.</p>
            </div>
          )}

          {!loading && !error && lapanganList.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {lapanganList.map((lapangan) => (
                <div key={lapangan.id} className="court-card bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-brand-500/50 transition-colors">
                  <div className="relative h-52 overflow-hidden bg-gradient-to-br from-navy-800 to-navy-900">
                    <img
                      src={lapangan.foto || '/image.png'}
                      alt={lapangan.nama}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-brand-600/90 text-white px-2.5 py-1 rounded-full">
                      {jenisLabel[lapangan.jenis] ?? lapangan.jenis}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-white text-lg">{lapangan.nama}</h3>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400 text-sm mb-4">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12,6 12,12 16,14" />
                      </svg>
                      <span>{lapangan.jam_buka?.slice(0, 5)} - {lapangan.jam_tutup?.slice(0, 5)}</span>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-2xl font-extrabold text-brand-400">Rp {formatRupiah(lapangan.harga_per_jam)}</span>
                        <span className="text-gray-500 text-sm">/jam</span>
                      </div>
                    </div>
                    <Link
                      to={`/detail/${lapangan.id}`}
                      className="btn-primary w-full mt-4 py-2.5 text-white font-semibold rounded-xl text-sm flex items-center justify-center transition-opacity hover:opacity-90"
                    >
                      Pesan Sekarang
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* HOW TO ORDER */}
      <section id="cara-pesan" className="bg-[#060d1f] border-t border-white/10 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">Cara Pesan Lapangan</h2>
            <p className="text-gray-400 text-base max-w-lg mx-auto">Empat langkah singkat untuk mulai bermain</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 max-w-4xl mx-auto">
            {caraPesan.map((langkah, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-brand-600/15 border border-brand-500/30 flex items-center justify-center">
                  <svg className="w-7 h-7 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    {langkah.icon}
                  </svg>
                </div>
                <h3 className="font-bold text-white text-sm mb-2">{langkah.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{langkah.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
