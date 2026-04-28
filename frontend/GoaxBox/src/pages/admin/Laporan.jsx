import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const formatRupiah = (n) => `Rp ${Math.round(n).toLocaleString('id-ID')}`;

const monthlyRevenue = [
  { bulan: 'Jan', pendapatan: 4500000, booking: 28 },
  { bulan: 'Feb', pendapatan: 5200000, booking: 35 },
  { bulan: 'Mar', pendapatan: 6100000, booking: 42 },
  { bulan: 'Apr', pendapatan: 7800000, booking: 51 },
];

const topLapangan = [
  { nama: 'Lapangan Futsal A', booking: 48, pendapatan: 7200000, persentase: 85 },
  { nama: 'Lapangan Futsal VIP', booking: 35, pendapatan: 10500000, persentase: 72 },
  { nama: 'Lapangan Mini Soccer', booking: 30, pendapatan: 7500000, persentase: 65 },
  { nama: 'Lapangan Futsal B', booking: 28, pendapatan: 4900000, persentase: 58 },
  { nama: 'Lapangan Basket Indoor', booking: 22, pendapatan: 4400000, persentase: 45 },
  { nama: 'Lapangan Badminton 1', booking: 18, pendapatan: 1800000, persentase: 38 },
];

const recentActivity = [
  { aksi: 'Booking dikonfirmasi', detail: 'GBX-20260428-001 oleh Ahmad Rizki', waktu: '2 menit lalu', warna: 'text-emerald-400 bg-emerald-600/15' },
  { aksi: 'Pembayaran diterima', detail: 'GBX-20260428-002 via Transfer Manual', waktu: '15 menit lalu', warna: 'text-blue-400 bg-blue-600/15' },
  { aksi: 'Booking baru', detail: 'GBX-20260428-003 - Lapangan Futsal VIP', waktu: '1 jam lalu', warna: 'text-brand-400 bg-brand-600/15' },
  { aksi: 'Booking dibatalkan', detail: 'GBX-20260427-004 oleh Dewi Lestari', waktu: '3 jam lalu', warna: 'text-red-400 bg-red-600/15' },
  { aksi: 'Refund diproses', detail: 'GBX-20260426-006 sebesar Rp 400.000', waktu: '5 jam lalu', warna: 'text-yellow-400 bg-yellow-600/15' },
];

const Laporan = () => {
  const [periode, setPeriode] = useState('bulan-ini');

  const totalPendapatan = monthlyRevenue.reduce((s, m) => s + m.pendapatan, 0);
  const totalBooking = monthlyRevenue.reduce((s, m) => s + m.booking, 0);
  const maxPendapatan = Math.max(...monthlyRevenue.map(m => m.pendapatan));

  return (
    <AdminLayout title="Laporan">
      {/* Period Selector & Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex gap-2">
          {[
            { id: 'minggu-ini', label: 'Minggu Ini' },
            { id: 'bulan-ini', label: 'Bulan Ini' },
            { id: 'tahun-ini', label: 'Tahun Ini' },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => setPeriode(p.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${periode === p.id
                ? 'bg-brand-600 text-white'
                : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
                }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 font-medium text-sm px-5 py-2.5 rounded-xl transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7,10 12,15 17,10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export PDF
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {[
          { label: 'Total Pendapatan', value: formatRupiah(totalPendapatan), accent: 'bg-emerald-600/15 text-emerald-400', icon: <><polyline points="22,12 18,12 15,21 9,3 6,12 2,12" /></> },
          { label: 'Total Booking', value: totalBooking, accent: 'bg-brand-600/15 text-brand-400', icon: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /></> },
          { label: 'Rata-rata / Bulan', value: formatRupiah(totalPendapatan / monthlyRevenue.length), accent: 'bg-purple-600/15 text-purple-400', icon: <><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></> },
          { label: 'Tingkat Konversi', value: '87%', accent: 'bg-yellow-600/15 text-yellow-400', icon: <><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22,4 12,14.01 9,11.01" /></> },
        ].map((card) => (
          <div key={card.label} className="bg-[#1a2332] rounded-2xl p-5 border border-white/5">
            <div className={`w-11 h-11 rounded-xl ${card.accent} flex items-center justify-center mb-4`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">{card.icon}</svg>
            </div>
            <p className="text-gray-400 text-xs font-semibold tracking-wider uppercase mb-1">{card.label}</p>
            <p className="text-3xl font-extrabold text-white">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart (simplified bar chart) */}
        <div className="lg:col-span-2 bg-[#1a2332] rounded-2xl border border-white/5 p-6">
          <h3 className="text-lg font-bold text-white mb-6">Pendapatan Bulanan</h3>
          <div className="flex items-end gap-4 h-48">
            {monthlyRevenue.map((m) => (
              <div key={m.bulan} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-gray-400 font-semibold">{formatRupiah(m.pendapatan)}</span>
                <div
                  className="w-full bg-gradient-to-t from-brand-600 to-brand-400 rounded-t-lg transition-all duration-500 hover:opacity-80"
                  style={{ height: `${(m.pendapatan / maxPendapatan) * 100}%`, minHeight: '20px' }}
                ></div>
                <span className="text-xs text-gray-500 font-medium">{m.bulan}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#1a2332] rounded-2xl border border-white/5 p-6">
          <h3 className="text-lg font-bold text-white mb-5">Aktivitas Terakhir</h3>
          <div className="space-y-4">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg ${a.warna} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium">{a.aksi}</p>
                  <p className="text-gray-500 text-xs truncate">{a.detail}</p>
                  <p className="text-gray-600 text-[10px] mt-0.5">{a.waktu}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Lapangan */}
      <div className="bg-[#1a2332] rounded-2xl border border-white/5 p-6 mt-6">
        <h3 className="text-lg font-bold text-white mb-5">Lapangan Terpopuler</h3>
        <div className="space-y-4">
          {topLapangan.map((l, i) => (
            <div key={l.nama} className="flex items-center gap-4">
              <span className="text-gray-600 text-sm font-bold w-6 text-center">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-white text-sm font-medium truncate">{l.nama}</span>
                  <span className="text-gray-400 text-xs ml-2 whitespace-nowrap">{l.booking} booking · {formatRupiah(l.pendapatan)}</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full transition-all duration-700"
                    style={{ width: `${l.persentase}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Laporan;
