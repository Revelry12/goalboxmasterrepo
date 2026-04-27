import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Detail = () => {
  const fasilitasArena = [
    {
      nama: 'Parkir',
      icon: (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25v-1.5h1.5v1.5zm-5.25-1.5h-2.25v1.5h1.5v-1.5z" />
          <text x="12" y="14" fontSize="6" fill="currentColor" textAnchor="middle" stroke="none" className="font-bold">P</text>
        </>
      )
    },
    {
      nama: 'Toilet',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    },
    {
      nama: 'WiFi',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
    },
    {
      nama: 'Kantin',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
    },
    {
      nama: 'Loker',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    },
    {
      nama: 'Ruang Ganti',
      icon: (
        <>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </>
      )
    },
    {
      nama: 'PC Area',
      icon: (
        <>
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </>
      )
    },
    {
      nama: 'CCTV',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316zM16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
    },
    {
      nama: 'Tribun',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.52 48.52 0 0012 4.5c-2.258 0-4.469.171-6.626.5m13.252 0A48.653 48.653 0 0121 5.37m-21 0a48.653 48.653 0 002.247-.4M18.75 4.97V19.5M5.25 4.97V19.5m13.5 0c0 1.458-1.5 2.625-3.375 2.625M5.25 19.5c0 1.458 1.5 2.625 3.375 2.625" />
    },
    {
      nama: 'P3K',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
    }
  ];

  const jadwalTersedia = [
    {
      jam: '08:00',
      status: ['Bebas', 'Penuh', 'Bebas', 'Bebas', 'Menipis', 'Penuh', 'Penuh']
    },
    {
      jam: '19:00',
      status: ['Penuh', 'Penuh', 'Penuh', 'Penuh', 'Penuh', 'Penuh', 'Penuh']
    },
    {
      jam: '21:00',
      status: ['Menipis', 'Bebas', 'Bebas', 'Bebas', 'Menipis', 'Penuh', 'Penuh']
    }
  ];

  return (
    <div className="bg-[#0a1128] font-sans antialiased text-gray-300 flex flex-col min-h-screen">
      <Navbar className="bg-[#060d1f] border-b border-white/10 sticky top-0 z-50" />

      {/* ===== MAIN CONTENT ===== */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8 mb-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-6">
          <Link to="/" className="hover:text-white transition-colors">Beranda</Link>
          <span>/</span>
          <a href="/#lapangan" className="hover:text-white transition-colors">Lapangan</a>
          <span>/</span>
          <span className="text-brand-400" aria-current="page">Lapangan Makmur Jaya</span>
        </nav>

        {/* Image Gallery */}
        <section aria-label="Galeri Foto" className="grid grid-cols-3 gap-4 h-[400px] mb-8 rounded-2xl overflow-hidden">
          <div className="col-span-2 bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center relative group">
            <div className="text-center">
              <img src="/image.png" alt="Lapangan Futsal" />
            </div>
          </div>
          <div className="col-span-1 grid grid-rows-2 gap-4">
            <div className="bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-10 h-10 text-white/20 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <p className="text-white/40 text-xs">Thumbnail 1</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-navy-800 to-navy-900 border border-white/5 relative flex items-center justify-center cursor-pointer hover:bg-brand-900 transition-colors">
              <div className="absolute inset-0 bg-[#0a1128]/60 flex flex-col items-center justify-center backdrop-blur-[2px]">
                <svg className="w-8 h-8 text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
                <span className="text-white font-medium text-sm">Lihat Semua Foto</span>
                <span className="text-white/60 text-xs mt-1">10+ Foto</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-10">

          {/* Left Column (Details) */}
          <article className="lg:col-span-2 space-y-8">

            {/* Header Info */}
            <header className="border-b border-white/10 pb-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h1 className="text-3xl font-bold text-white">Lapangan Makmur Jaya</h1>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Jl. Raya Makmur Suri No. 123, 2.5km dari lokasi Anda</span>
              </div>
            </header>

            {/* Tabs */}
            <nav aria-label="Navigasi Lapangan" className="flex items-center gap-6 border-b border-white/10">
              <a href="#" className="text-brand-400 font-semibold text-sm py-4 border-b-2 border-brand-400">Info</a>
              <a href="#fasilitas" className="text-gray-400 hover:text-white font-medium text-sm py-4 border-b-2 border-transparent hover:border-white/30 transition-colors">Fasilitas</a>
              <a href="#jadwal" className="text-gray-400 hover:text-white font-medium text-sm py-4 border-b-2 border-transparent hover:border-white/30 transition-colors">Jadwal Tersedia</a>
            </nav>

            {/* Description */}
            <section aria-label="Deskripsi Lapangan" className="prose prose-invert max-w-none text-sm text-gray-400 leading-relaxed">
              <p>
                Nikmati pengalaman bermain futsal profesional di Lapangan Makmur Jaya. Menggunakan lantai interlock standar internasional yang memberikan grip maksimal dan meminimalisir risiko cedera. Dilengkapi dengan pencahayaan LED 500W yang merata ke seluruh sudut lapangan, cocok untuk pertandingan malam hari yang intens.
              </p>
            </section>

            {/* Specs Grid */}
            <section aria-label="Spesifikasi Lapangan" className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-0.5">Ukuran</p>
                  <p className="text-white font-medium text-sm">20 x 40 m</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="21" x2="9" y2="9" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-0.5">Lantai</p>
                  <p className="text-white font-medium text-sm">Interlock</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-0.5">Kapasitas</p>
                  <p className="text-white font-medium text-sm">12 Orang</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.493 1.509 1.333 1.509 2.316V18" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-0.5">Lampu</p>
                  <p className="text-white font-medium text-sm">LED 500W</p>
                </div>
              </div>
            </section>

            {/* Map Area Placeholder */}
            <section aria-label="Peta Lokasi" className="h-48 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <svg className="w-24 h-24 text-white/10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <div className="absolute w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/50">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L1 21h22L12 2zm0 3.8l7.5 13.2h-15L12 5.8zM11 10v4h2v-4h-2zm0 5v2h2v-2h-2z" />
                </svg>
              </div>
            </section>

            {/* Fasilitas Area */}
            <section id="fasilitas" aria-labelledby="fasilitas-title" className="pt-4">
              <h2 id="fasilitas-title" className="text-lg font-bold text-white mb-6">Fasilitas Arena</h2>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                {fasilitasArena.map((fasilitas, index) => (
                  <div key={index} className="bg-white/5 hover:bg-white/10 transition-colors border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-center aspect-square">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      {fasilitas.icon}
                    </svg>
                    <span className="text-[11px] font-medium text-gray-400">{fasilitas.nama}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Jadwal Tersedia */}
            <section id="jadwal" aria-labelledby="jadwal-title" className="pt-4">
              <h2 id="jadwal-title" className="text-lg font-bold text-white mb-6">Jadwal Tersedia</h2>
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="border-b border-white/10 text-xs font-semibold text-gray-400 uppercase bg-white/5">
                        <th className="py-4 px-4 text-left border-r border-white/5 font-medium">Jam</th>
                        <th className="py-4 px-4 text-center border-r border-white/5 font-medium">Sen</th>
                        <th className="py-4 px-4 text-center border-r border-white/5 font-medium">Sel</th>
                        <th className="py-4 px-4 text-center border-r border-white/5 font-medium">Rab</th>
                        <th className="py-4 px-4 text-center border-r border-white/5 font-medium">Kam</th>
                        <th className="py-4 px-4 text-center border-r border-white/5 font-medium">Jum</th>
                        <th className="py-4 px-4 text-center border-r border-white/5 font-medium">Sab</th>
                        <th className="py-4 px-4 text-center font-medium">Min</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs">
                      {jadwalTersedia.map((jadwal, i) => (
                        <tr key={i} className="border-b border-white/5 last:border-0">
                          <td className="py-3 px-4 font-semibold text-gray-300 border-r border-white/5 text-left">
                            {jadwal.jam}
                          </td>
                          {jadwal.status.map((status, j) => (
                            <td key={j} className={`py-3 px-2 ${j === jadwal.status.length - 1 ? '' : 'border-r border-white/5'}`}>
                              {status === 'Bebas' ? (
                                <div className="bg-brand-900/50 text-brand-300 py-1.5 px-2 rounded font-medium text-center border border-brand-500/20">Bebas</div>
                              ) : status === 'Menipis' ? (
                                <div className="bg-orange-500/10 text-orange-400 py-1.5 px-2 rounded font-medium text-center border border-orange-500/20">Menipis</div>
                              ) : (
                                <div className="bg-white/5 text-gray-500 py-1.5 px-2 rounded text-center border border-transparent line-through">Penuh</div>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 mt-4 text-[11px] font-medium text-gray-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-brand-500"></div>
                  <span>TERSEDIA</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full border border-gray-600"></div>
                  <span>SUDAH DIPESAN</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                  <span>SISA SEDIKIT</span>
                </div>
              </div>
            </section>

          </article>

          {/* Right Column (Booking Widget) */}
          <aside aria-label="Widget Pemesanan" className="lg:col-span-1">
            <div className="sticky top-28 space-y-4">
              {/* Main Booking Card */}
              <div className="bg-gradient-to-br from-navy-900 to-[#111a36] border border-white/10 rounded-2xl p-6">
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-1">Harga Sewa</p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-3xl font-extrabold text-white">Rp 100.000</span>
                  <span className="text-sm text-gray-400 mb-1">/ jam</span>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5 block">Pilih Tanggal</label>
                    <div className="relative">
                      <input type="date" className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors" defaultValue="2024-10-25" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5 block">Jam Mulai</label>
                      <select className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors">
                        <option>19:00</option>
                        <option>20:00</option>
                        <option>21:00</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5 block">Jam Selesai</label>
                      <select className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors">
                        <option>21:00</option>
                        <option>22:00</option>
                        <option>23:00</option>
                      </select>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4 mt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Durasi</span>
                      <span className="text-sm text-white font-medium">2 Jam</span>
                    </div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-sm text-gray-400">Total Pembayaran</span>
                      <span className="text-lg font-bold text-white">Rp 200.000</span>
                    </div>
                  </div>

                  <Link to="/booking" className="w-full bg-brand-200 hover:bg-brand-300 text-brand-900 font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                    PESAN SEKARANG
                  </Link>
                </form>
              </div>

              {/* Policies Info */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
                  <h4 className="text-sm font-semibold text-gray-300">Kebijakan Pembatalan</h4>
                </div>
                <ul className="space-y-2 text-[11px] text-gray-400">
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-brand-400"></div>
                    <span><strong className="text-white">100% Refund:</strong> Pembatalan &gt; 48 Jam</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-orange-400"></div>
                    <span><strong className="text-white">50% Refund:</strong> Pembatalan 24 - 48 Jam</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-red-400"></div>
                    <span><strong className="text-white">No Refund:</strong> Pembatalan &lt; 24 Jam</span>
                  </li>
                </ul>
              </div>

              {/* Contact Pengelola */}
              <button className="w-full bg-[#0a1128] hover:bg-white/5 border border-white/10 text-white font-medium text-sm py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 group">
                <svg className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Hubungi Pengelola
              </button>
            </div>
          </aside>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Detail;
