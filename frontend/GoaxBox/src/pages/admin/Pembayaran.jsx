import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const dummyPayments = [
  { id: 1, kode: 'GBX-20260428-001', user: 'Ahmad Rizki', lapangan: 'Lapangan Futsal A', tanggal: '2026-04-28', metode: 'Transfer Manual', jumlah: 300000, status: 'success', bukti: true },
  { id: 2, kode: 'GBX-20260428-002', user: 'Siti Nurhaliza', lapangan: 'Lapangan Futsal B', tanggal: '2026-04-28', metode: 'Transfer Manual', jumlah: 350000, status: 'pending', bukti: true },
  { id: 3, kode: 'GBX-20260427-003', user: 'Budi Santoso', lapangan: 'Lapangan Mini Soccer', tanggal: '2026-04-27', metode: 'Midtrans', jumlah: 500000, status: 'settlement', bukti: false },
  { id: 4, kode: 'GBX-20260427-004', user: 'Dewi Lestari', lapangan: 'Lapangan Futsal VIP', tanggal: '2026-04-27', metode: 'Transfer Manual', jumlah: 600000, status: 'failed', bukti: true },
  { id: 5, kode: 'GBX-20260426-005', user: 'Rudi Hermawan', lapangan: 'Lapangan Badminton 1', tanggal: '2026-04-26', metode: 'Midtrans', jumlah: 200000, status: 'settlement', bukti: false },
  { id: 6, kode: 'GBX-20260426-006', user: 'Rina Wati', lapangan: 'Lapangan Basket Indoor', tanggal: '2026-04-26', metode: 'Transfer Manual', jumlah: 400000, status: 'pending', bukti: true },
  { id: 7, kode: 'GBX-20260425-007', user: 'Joko Widodo', lapangan: 'Lapangan Futsal A', tanggal: '2026-04-25', metode: 'Transfer Manual', jumlah: 300000, status: 'success', bukti: true },
  { id: 8, kode: 'GBX-20260425-008', user: 'Maya Sari', lapangan: 'Lapangan Futsal B', tanggal: '2026-04-25', metode: 'Midtrans', jumlah: 350000, status: 'settlement', bukti: false },
];

const paymentStatusBadge = {
  success: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
  settlement: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
  pending: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  failed: 'text-red-400 bg-red-400/10 border-red-400/30',
};

const paymentStatusLabel = {
  success: 'Berhasil',
  settlement: 'Settlement',
  pending: 'Pending',
  failed: 'Gagal',
};

const formatRupiah = (n) => `Rp ${Math.round(n).toLocaleString('id-ID')}`;

const Pembayaran = () => {
  const [filter, setFilter] = useState('semua');
  const [search, setSearch] = useState('');

  const totalPending = dummyPayments.filter(p => p.status === 'pending').reduce((s, p) => s + p.jumlah, 0);
  const totalSuccess = dummyPayments.filter(p => ['success', 'settlement'].includes(p.status)).reduce((s, p) => s + p.jumlah, 0);
  const totalFailed = dummyPayments.filter(p => p.status === 'failed').reduce((s, p) => s + p.jumlah, 0);

  const filtered = dummyPayments.filter((p) => {
    const matchFilter = filter === 'semua' || p.status === filter || (filter === 'berhasil' && ['success', 'settlement'].includes(p.status));
    const matchSearch = p.kode.toLowerCase().includes(search.toLowerCase()) || p.user.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <AdminLayout title="Pembayaran">
      {/* Revenue Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-[#1a2332] rounded-2xl p-5 border border-white/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/15 text-emerald-400 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
              </svg>
            </div>
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Total Diterima</span>
          </div>
          <p className="text-2xl font-extrabold text-emerald-400">{formatRupiah(totalSuccess)}</p>
        </div>
        <div className="bg-[#1a2332] rounded-2xl p-5 border border-white/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-600/15 text-yellow-400 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" />
              </svg>
            </div>
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Menunggu</span>
          </div>
          <p className="text-2xl font-extrabold text-yellow-400">{formatRupiah(totalPending)}</p>
        </div>
        <div className="bg-[#1a2332] rounded-2xl p-5 border border-white/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/15 text-red-400 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Gagal</span>
          </div>
          <p className="text-2xl font-extrabold text-red-400">{formatRupiah(totalFailed)}</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex gap-2">
          {[
            { id: 'semua', label: 'Semua' },
            { id: 'berhasil', label: 'Berhasil' },
            { id: 'pending', label: 'Pending' },
            { id: 'failed', label: 'Gagal' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${filter === f.id
                ? 'bg-brand-600 text-white'
                : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
                }`}
            >
              {f.label}
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
            placeholder="Cari kode atau nama..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#1a2332] border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 transition-colors w-full md:w-64"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1a2332] rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-500 text-xs font-semibold uppercase tracking-wider border-b border-white/5">
                <th className="text-left px-6 py-4">Kode Booking</th>
                <th className="text-left px-4 py-4">Pemesan</th>
                <th className="text-left px-4 py-4">Lapangan</th>
                <th className="text-left px-4 py-4">Tanggal</th>
                <th className="text-left px-4 py-4">Metode</th>
                <th className="text-left px-4 py-4">Jumlah</th>
                <th className="text-left px-4 py-4">Status</th>
                <th className="text-center px-4 py-4">Bukti</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="8" className="text-center py-12 text-gray-500 text-sm">Tidak ada data pembayaran.</td></tr>
              ) : filtered.map((p) => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                  <td className="px-6 py-4"><span className="text-brand-400 font-bold text-sm font-mono">{p.kode}</span></td>
                  <td className="px-4 py-4"><span className="text-white text-sm">{p.user}</span></td>
                  <td className="px-4 py-4"><span className="text-gray-300 text-sm">{p.lapangan}</span></td>
                  <td className="px-4 py-4"><span className="text-gray-400 text-sm">{p.tanggal}</span></td>
                  <td className="px-4 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${p.metode === 'Midtrans' ? 'bg-blue-500/10 text-blue-400' : 'bg-white/5 text-gray-400'}`}>
                      {p.metode}
                    </span>
                  </td>
                  <td className="px-4 py-4"><span className="text-white text-sm font-semibold">{formatRupiah(p.jumlah)}</span></td>
                  <td className="px-4 py-4">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${paymentStatusBadge[p.status] ?? ''}`}>
                      {paymentStatusLabel[p.status] ?? p.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {p.bukti ? (
                      <button className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors">
                        Lihat Bukti
                      </button>
                    ) : (
                      <span className="text-gray-600 text-xs">Otomatis</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Pembayaran;
