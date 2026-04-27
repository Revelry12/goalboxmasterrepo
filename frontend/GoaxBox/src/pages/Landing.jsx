import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Landing = () => {
  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const lapanganUnggulan = [
    {
      nama: 'Arena Pro Blue',
      rating: '4.7',
      lokasi: 'Sudirman, Jakarta',
      harga: '250.000',
      gambar: '/image.png'
    },
    {
      nama: 'Elite Parquet Court',
      rating: '4.8',
      lokasi: 'Kuningan, Jakarta',
      harga: '300.000',
      gambar: '/image.png'
    },
    {
      nama: 'Green Turf Arena',
      rating: '4.9',
      lokasi: 'Senayan, Jakarta',
      harga: '225.000',
      gambar: '/image.png'
    }
  ];

  const caraPesan = [
    {
      title: 'Pilih Lapangan',
      desc: 'Cari lapangan terbaik sesuai lokasi dan fasilitas.',
      icon: (
        <>
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </>
      ),
      bg: 'bg-brand-50 border border-brand-100',
      iconColor: 'text-brand-600'
    },
    {
      title: 'Pilih Jadwal',
      desc: 'Tentukan hari dan jam yang sesuai keinginanmu.',
      icon: (
        <>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </>
      ),
      bg: 'bg-brand-50 border border-brand-100',
      iconColor: 'text-brand-600'
    },
    {
      title: 'Bayar',
      desc: 'Lakukan pembayaran aman melalui berbagai kanal digital.',
      icon: (
        <>
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </>
      ),
      bg: 'bg-brand-50 border border-brand-100',
      iconColor: 'text-brand-600'
    },
    {
      title: 'Main!',
      desc: 'Tunjukkan bukti booking di lokasi dan selamat bermain.',
      icon: (
        <>
          <circle cx="12" cy="12" r="10" />
          <polygon points="10,8 16,12 10,16" fill="currentColor" />
        </>
      ),
      bg: 'bg-brand-600 border border-transparent',
      iconColor: 'text-white'
    }
  ];

  return (
    <div className="bg-[#0a1128] font-sans antialiased text-gray-300 flex flex-col min-h-screen">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section id="beranda" className="hero-gradient relative min-h-[700px] flex items-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-brand-500/3 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-600/15 border border-brand-500/20 rounded-full px-4 py-1.5 mb-8 animate-fade-in-up" style={{ opacity: 0 }} data-animate="true">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
                <span className="text-brand-300 text-xs font-semibold tracking-wide uppercase">Pesan Futsal Sekarang</span>
              </div>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight mb-6 animate-fade-in-up delay-100" style={{ opacity: 0 }} data-animate="true">
                Pesan Lapangan<br />
                Futsal <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-400">Kapan Saja</span>
              </h1>

              <p className="text-gray-400 text-lg leading-relaxed max-w-lg mb-10 animate-fade-in-up delay-200" style={{ opacity: 0 }} data-animate="true">
                Nikmati kemudahan booking lapangan futsal terbaik di kotamu. Proses cepat, dan terpercaya untuk performa maksimalmu di lapangan.
              </p>

              {/* Search/Booking Form */}
              <div className="glass-card rounded-2xl p-5 max-w-xl animate-fade-in-up delay-300" style={{ opacity: 0 }} data-animate="true">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                  <div>
                    <label className="text-gray-400 text-xs font-medium mb-1.5 block">KOTA</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors">
                      <option>Jakarta</option>
                      <option>Bandung</option>
                      <option>Surabaya</option>
                      <option>Batam</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs font-medium mb-1.5 block">TANGGAL</label>
                    <input type="date" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs font-medium mb-1.5 block">JAM MULAI</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors">
                      <option>08:00</option>
                      <option>09:00</option>
                      <option>10:00</option>
                      <option>11:00</option>
                      <option>12:00</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs font-medium mb-1.5 block">JAM SELESAI</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors">
                      <option>09:00</option>
                      <option>10:00</option>
                      <option>11:00</option>
                      <option>12:00</option>
                      <option>13:00</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="btn-primary flex-1 py-3 text-white font-semibold rounded-xl flex items-center justify-center gap-2 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                    </svg>
                    Cari Lapangan
                  </button>
                  <div className="glass-card-light rounded-xl px-4 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold">WAKTU NYATA</p>
                      <p className="text-gray-400 text-[11px]">Update Instan</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Image Placeholder */}
            <div className="hidden lg:block animate-fade-in-right delay-300" style={{ opacity: 0 }} data-animate="true">
              <div className="relative">
                <div className="w-full h-[400px] rounded-3xl bg-gradient-to-br from-navy-800 to-navy-950 border border-white/10 flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <img src="/image.png" alt="Hero" className="w-full h-full object-cover" />
                  </div>
                </div>
                {/* Decorative glow */}
                <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-brand-600/20 rounded-full blur-3xl"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
            <div className="animate-count-up" style={{ opacity: 0 }} data-animate="true">
              <p className="text-3xl lg:text-4xl font-extrabold text-gray-900">10+</p>
              <p className="text-gray-500 text-xs font-semibold tracking-wider uppercase mt-2">Lapangan Tersedia</p>
            </div>
            <div className="animate-count-up delay-200" style={{ opacity: 0 }} data-animate="true">
              <p className="text-3xl lg:text-4xl font-extrabold text-gray-900">10.000+</p>
              <p className="text-gray-500 text-xs font-semibold tracking-wider uppercase mt-2">Booking Selesai</p>
            </div>
            <div className="animate-count-up delay-400" style={{ opacity: 0 }} data-animate="true">
              <p className="text-3xl lg:text-4xl font-extrabold text-gray-900 flex items-center justify-center gap-1">
                4.9
                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </p>
              <p className="text-gray-500 text-xs font-semibold tracking-wider uppercase mt-2">Rating Pengguna</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED COURTS SECTION ===== */}
      <section id="lapangan" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">Lapangan Unggulan</h2>
              <p className="text-gray-500 text-base">Pilihan terbaik untuk performa kelas dunia</p>
            </div>
            <a href="#" className="hidden md:flex items-center gap-2 text-brand-600 font-semibold text-sm hover:text-brand-700 transition-colors group">
              Lihat Semua
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lapanganUnggulan.map((lapangan, index) => (
              <div key={index} className="court-card bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="relative h-52 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <img src={lapangan.gambar} alt={lapangan.nama} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">{lapangan.nama}</h3>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2.5 py-1 rounded-lg">
                      <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="text-yellow-700 text-xs font-bold">{lapangan.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400 text-sm mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{lapangan.lokasi}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-2xl font-extrabold text-brand-600">Rp {lapangan.harga}</span>
                      <span className="text-gray-400 text-sm">/jam</span>
                    </div>
                  </div>
                  <Link to="/detail" className="btn-primary w-full mt-4 py-2.5 text-white font-semibold rounded-xl text-sm flex items-center justify-center transition-opacity hover:opacity-90">
                    Pesan Sekarang
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW TO ORDER SECTION ===== */}
      <section id="cara-pesan" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">Cara Pesan Lapangan</h2>
            <p className="text-gray-500 text-base max-w-lg mx-auto">Proses mudah dan cepat untuk mulai bertanding</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 max-w-4xl mx-auto">
            {caraPesan.map((langkah, index) => (
              <div key={index} className="step-card text-center">
                <div className={`step-icon w-16 h-16 mx-auto mb-5 rounded-2xl ${langkah.bg} flex items-center justify-center`}>
                  <svg className={`w-7 h-7 ${langkah.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    {langkah.icon}
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-2">{langkah.title}</h3>
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
