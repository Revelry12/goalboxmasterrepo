import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const revenueChartRef = useRef(null);
  const statusChartRef = useRef(null);

  useEffect(() => {
    // Add Chart.js script if not exists
    const scriptId = 'chartjs-script';
    let script = document.getElementById(scriptId);

    const initCharts = () => {
      if (!window.Chart) return;
      
      // Revenue Chart
      if (revenueChartRef.current) {
        const revenueCtx = revenueChartRef.current.getContext('2d');
        const revenueGradient = revenueCtx.createLinearGradient(0, 0, 0, 250);
        revenueGradient.addColorStop(0, 'rgba(59, 91, 255, 0.3)');
        revenueGradient.addColorStop(1, 'rgba(59, 91, 255, 0)');

        // Destroy previous chart if exists
        if (window.revenueChartInstance) {
          window.revenueChartInstance.destroy();
        }

        window.revenueChartInstance = new window.Chart(revenueCtx, {
          type: 'bar',
          data: {
            labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
            datasets: [{
              data: [5.2, 7.8, 4.5, 6.0, 8.5, 9.1, 6.8],
              backgroundColor: function(context) {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
                if (!chartArea) return 'rgba(59, 91, 255, 0.6)';
                const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                gradient.addColorStop(0, 'rgba(59, 91, 255, 0.2)');
                gradient.addColorStop(1, 'rgba(59, 91, 255, 0.8)');
                return gradient;
              },
              borderColor: 'rgba(59, 91, 255, 1)',
              borderWidth: 0,
              borderRadius: 8,
              borderSkipped: false,
              barThickness: 32,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: '#1a2332',
                titleColor: '#fff',
                bodyColor: '#9ca3af',
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1,
                cornerRadius: 12,
                padding: 12,
                displayColors: false,
                callbacks: {
                  label: function(context) {
                    return 'Rp ' + context.parsed.y + ' M';
                  }
                }
              }
            },
            scales: {
              x: {
                border: { display: false },
                grid: { display: false },
                ticks: {
                  color: '#6b7280',
                  font: { size: 11, weight: '600' }
                }
              },
              y: {
                border: { display: false },
                grid: {
                  color: 'rgba(255,255,255,0.05)',
                  drawTicks: false,
                },
                ticks: {
                  color: '#6b7280',
                  font: { size: 11 },
                  padding: 10,
                  callback: function(value) {
                    return 'Rp ' + value + 'M';
                  }
                }
              }
            }
          }
        });
      }

      // Status Chart
      if (statusChartRef.current) {
        const statusCtx = statusChartRef.current.getContext('2d');
        
        // Destroy previous chart if exists
        if (window.statusChartInstance) {
          window.statusChartInstance.destroy();
        }

        window.statusChartInstance = new window.Chart(statusCtx, {
          type: 'doughnut',
          data: {
            labels: ['Selesai', 'Menunggu', 'Dibatalkan'],
            datasets: [{
              data: [65, 25, 10],
              backgroundColor: ['#34d399', '#fbbf24', '#f87171'],
              borderColor: '#1a2332',
              borderWidth: 4,
              hoverBorderWidth: 2,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '70%',
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: '#1a2332',
                titleColor: '#fff',
                bodyColor: '#9ca3af',
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1,
                cornerRadius: 12,
                padding: 12,
                callbacks: {
                  label: function(context) {
                    return context.label + ': ' + context.parsed + '%';
                  }
                }
              }
            }
          }
        });
      }
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js';
      script.onload = initCharts;
      document.head.appendChild(script);
    } else {
      initCharts();
    }

    return () => {
      if (window.revenueChartInstance) window.revenueChartInstance.destroy();
      if (window.statusChartInstance) window.statusChartInstance.destroy();
    };
  }, []);

  return (
    <div className="bg-[#111827] font-sans antialiased text-white min-h-screen flex">
      {/* ===== SIDEBAR ===== */}
      <aside className={`sidebar-gradient w-64 fixed left-0 top-0 bottom-0 z-40 flex flex-col border-r border-white/5 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/5">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10">
              <img src="/icon.svg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-white text-lg font-bold tracking-tight block">GoalBox</span>
              <span className="text-gray-500 text-[10px] font-medium tracking-widest uppercase">Admin Panel</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <Link to="/dashboard" className="sidebar-item active flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white">
            <svg className="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            Dashboard
          </Link>
          <Link to="#" className="sidebar-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 21V9" />
            </svg>
            Kelola Lapangan
          </Link>
          <Link to="#" className="sidebar-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Kelola Booking
          </Link>
          <Link to="#" className="sidebar-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            Pembayaran
          </Link>
          <Link to="#" className="sidebar-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
              <polyline points="17,6 23,6 23,12" />
            </svg>
            Refund
            <span className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center text-white">3</span>
          </Link>
        <Link to="#" className="sidebar-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14,2 14,8 20,8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10,9 9,9 8,9" />
          </svg>
          Laporan
        </Link>
        <Link to="#" className="sidebar-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          Notifikasi
        </Link>
        <Link to="#" className="sidebar-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
          Pengaturan
        </Link>
        </nav>

        {/* Logout */}
        <div className="px-4 py-5 border-t border-white/5">
          <Link to="/login" className="sidebar-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 w-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16,17 21,12 16,7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </Link>
        </div>
      </aside>

      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 lg:ml-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-[#111827]/80 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center justify-between px-6 lg:px-8 h-16">
            <div className="flex items-center gap-4">
              {/* Mobile menu toggle */}
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-xl font-bold text-white">Dashboard</h1>
            </div>

            {/* Search & Profile */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 w-64">
                <svg className="w-4 h-4 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input type="text" placeholder="Cari data..." className="bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none w-full" />
              </div>

              {/* Notification Bell */}
              <button className="relative text-gray-400 hover:text-white transition-colors p-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 01-3.46 0" />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile */}
              <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-white">Admin Utama</p>
                  <p className="text-xs text-gray-500">Super Admin</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  A
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 lg:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
            <div className="stat-card bg-[#1a2332] rounded-2xl p-5 border border-white/5">
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-brand-600/15 flex items-center justify-center">
                  <svg className="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">+12%</span>
              </div>
              <p className="text-gray-400 text-xs font-semibold tracking-wider uppercase mb-1">Total Booking</p>
              <p className="text-3xl font-extrabold text-white">1,284</p>
            </div>

            <div className="stat-card bg-[#1a2332] rounded-2xl p-5 border border-white/5">
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-600/15 flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">+8%</span>
              </div>
              <p className="text-gray-400 text-xs font-semibold tracking-wider uppercase mb-1">Pendapatan</p>
              <p className="text-3xl font-extrabold text-white">Rp 42.5M</p>
            </div>

            <div className="stat-card bg-[#1a2332] rounded-2xl p-5 border border-white/5">
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-yellow-600/15 flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" />
                  </svg>
                </div>
                <span className="badge-high text-[10px] font-bold px-2.5 py-1 rounded-full">High</span>
              </div>
              <p className="text-gray-400 text-xs font-semibold tracking-wider uppercase mb-1">Booking Menunggu</p>
              <p className="text-3xl font-extrabold text-white">24</p>
            </div>

            <div className="stat-card bg-[#1a2332] rounded-2xl p-5 border border-white/5">
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-red-600/15 flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
                    <polyline points="17,6 23,6 23,12" />
                  </svg>
                </div>
                <span className="badge-urgent text-[10px] font-bold px-2.5 py-1 rounded-full text-red-400 bg-red-400/10">Urgent</span>
              </div>
              <p className="text-gray-400 text-xs font-semibold tracking-wider uppercase mb-1">Refund Menunggu</p>
              <p className="text-3xl font-extrabold text-white">3</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid xl:grid-cols-3 gap-5 mb-8">
            <div className="xl:col-span-2 bg-[#1a2332] rounded-2xl p-6 border border-white/5">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white">Pendapatan 7 Hari Terakhir</h2>
                  <p className="text-gray-500 text-sm mt-0.5">Statistik harian pendapatan lapangan</p>
                </div>
                <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-brand-500 transition-colors">
                  <option>Minggu ini</option>
                  <option>Bulan ini</option>
                  <option>3 Bulan</option>
                </select>
              </div>
              <div className="h-64">
                <canvas ref={revenueChartRef}></canvas>
              </div>
            </div>

            <div className="bg-[#1a2332] rounded-2xl p-6 border border-white/5">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-white">Status Booking</h2>
                <p className="text-gray-500 text-sm mt-0.5">Distribusi reservasi</p>
              </div>
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <canvas ref={statusChartRef} width="180" height="180"></canvas>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <p className="text-2xl font-extrabold text-white">1.2K</p>
                    <p className="text-gray-500 text-xs font-medium">TOTAL</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                    <span className="text-gray-300 text-sm">Selesai</span>
                  </div>
                  <span className="text-white font-bold text-sm">65%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                    <span className="text-gray-300 text-sm">Menunggu</span>
                  </div>
                  <span className="text-white font-bold text-sm">25%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-red-400"></span>
                    <span className="text-gray-300 text-sm">Dibatalkan</span>
                  </div>
                  <span className="text-white font-bold text-sm">10%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid xl:grid-cols-3 gap-5">
            <div className="xl:col-span-2 bg-[#1a2332] rounded-2xl border border-white/5 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                <h2 className="text-lg font-bold text-white">Booking Terbaru</h2>
                <a href="#" className="text-brand-400 text-sm font-medium hover:text-brand-300 transition-colors">Lihat Semua</a>
              </div>
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
                    <tr className="table-row border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4"><span className="text-brand-400 font-bold text-sm">#GB-9821</span></td>
                      <td className="px-4 py-4"><span className="text-white text-sm font-medium">Budi Santoso</span></td>
                      <td className="px-4 py-4"><span className="text-gray-300 text-sm">Arena A</span></td>
                      <td className="px-4 py-4">
                        <div className="text-gray-300 text-sm">12 Oct 2023</div>
                        <div className="text-gray-500 text-xs">19:00 - 21:00</div>
                      </td>
                      <td className="px-4 py-4"><span className="text-white text-sm font-semibold">Rp 350rb</span></td>
                      <td className="px-4 py-4"><span className="badge-lunas text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 text-xs font-bold px-3 py-1.5 rounded-full">LUNAS</span></td>
                      <td className="px-4 py-4 text-center">
                        <button className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
                        </button>
                      </td>
                    </tr>
                    <tr className="table-row border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4"><span className="text-brand-400 font-bold text-sm">#GB-9820</span></td>
                      <td className="px-4 py-4"><span className="text-white text-sm font-medium">Andi Wijaya</span></td>
                      <td className="px-4 py-4"><span className="text-gray-300 text-sm">Arena B</span></td>
                      <td className="px-4 py-4">
                        <div className="text-gray-300 text-sm">12 Oct 2023</div>
                        <div className="text-gray-500 text-xs">20:00 - 22:00</div>
                      </td>
                      <td className="px-4 py-4"><span className="text-white text-sm font-semibold">Rp 280rb</span></td>
                      <td className="px-4 py-4"><span className="badge-pending text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 text-xs font-bold px-3 py-1.5 rounded-full">PENDING</span></td>
                      <td className="px-4 py-4 text-center">
                        <button className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
                        </button>
                      </td>
                    </tr>
                    <tr className="table-row hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4"><span className="text-brand-400 font-bold text-sm">#GB-9819</span></td>
                      <td className="px-4 py-4"><span className="text-white text-sm font-medium">Citra Lestari</span></td>
                      <td className="px-4 py-4"><span className="text-gray-300 text-sm">Vip Arena</span></td>
                      <td className="px-4 py-4">
                        <div className="text-gray-300 text-sm">13 Oct 2023</div>
                        <div className="text-gray-500 text-xs">10:00 - 12:00</div>
                      </td>
                      <td className="px-4 py-4"><span className="text-white text-sm font-semibold">Rp 450rb</span></td>
                      <td className="px-4 py-4"><span className="badge-lunas text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 text-xs font-bold px-3 py-1.5 rounded-full">LUNAS</span></td>
                      <td className="px-4 py-4 text-center">
                        <button className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#1a2332] rounded-2xl border border-white/5 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                <h2 className="text-lg font-bold text-white">Refund Menunggu</h2>
                <span className="text-xs font-bold text-red-400 bg-red-400/10 px-3 py-1.5 rounded-full">3 TOTAL</span>
              </div>
              <div className="p-4 space-y-3 max-h-[480px] overflow-y-auto">
                <div className="refund-card bg-white/5 rounded-xl p-4 border border-white/10 hover:border-brand-500 transition-colors border-l-4 border-l-transparent hover:border-l-brand-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">F</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">Faisal Rahman</p>
                      <p className="text-gray-500 text-xs">#GB-9715 • Rp 150.000</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed mb-4 italic">"Hujan badai di area lapangan, akses jalan terputus. Mohon refund dana."</p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors">PROSES</button>
                    <button className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold py-2.5 rounded-lg border border-white/10 transition-colors">TOLAK</button>
                  </div>
                </div>

                <div className="refund-card bg-white/5 rounded-xl p-4 border border-white/10 hover:border-brand-500 transition-colors border-l-4 border-l-transparent hover:border-l-brand-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">S</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">Siska Olivia</p>
                      <p className="text-gray-500 text-xs">#GB-9760 • Rp 200.000</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed mb-4 italic">"Ada kendala teknis dari tim kami, pemain cedera mendadak."</p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors">PROSES</button>
                    <button className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold py-2.5 rounded-lg border border-white/10 transition-colors">TOLAK</button>
                  </div>
                </div>

                <div className="refund-card bg-white/5 rounded-xl p-4 border border-white/10 hover:border-brand-500 transition-colors border-l-4 border-l-transparent hover:border-l-brand-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">R</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">Roni Setiawan</p>
                      <p className="text-gray-500 text-xs">#GB-9762 • Rp 150.000</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed mb-4 italic">"Salah memilih jam booking, harusnya malam hari."</p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors">PROSES</button>
                    <button className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold py-2.5 rounded-lg border border-white/10 transition-colors">TOLAK</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
