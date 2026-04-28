import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const dummyLapangan = [
  { id: 1, nama: 'Lapangan Futsal A', jenis: 'Futsal', harga: 150000, status: 'Tersedia' },
  { id: 2, nama: 'Lapangan Futsal B', jenis: 'Futsal', harga: 175000, status: 'Tersedia' },
  { id: 3, nama: 'Lapangan Mini Soccer', jenis: 'Mini Soccer', harga: 250000, status: 'Maintenance' },
  { id: 4, nama: 'Lapangan Futsal VIP', jenis: 'Futsal', harga: 300000, status: 'Tersedia' },
  { id: 5, nama: 'Lapangan Badminton 1', jenis: 'Badminton', harga: 100000, status: 'Tersedia' },
  { id: 6, nama: 'Lapangan Basket Indoor', jenis: 'Basket', harga: 200000, status: 'Tersedia' },
];

const formatRupiah = (n) => `Rp ${Math.round(n).toLocaleString('id-ID')}`;

const KelolaLapangan = () => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filtered = dummyLapangan.filter(
    (l) => l.nama.toLowerCase().includes(search.toLowerCase()) || l.jenis.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Kelola Lapangan">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-gray-400 text-sm">Total {dummyLapangan.length} lapangan terdaftar</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cari lapangan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#1a2332] border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 transition-colors w-full sm:w-64"
            />
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Tambah Lapangan
          </button>
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((lap) => (
          <div key={lap.id} className="bg-[#1a2332] rounded-2xl border border-white/5 overflow-hidden group hover:border-white/10 transition-colors">
            {/* Image placeholder */}
            <div className="h-40 bg-gradient-to-br from-brand-900/30 to-purple-900/20 flex items-center justify-center text-5xl relative">
              <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${lap.status === 'Tersedia' ? 'bg-emerald-900/40 text-emerald-400' : 'bg-yellow-900/40 text-yellow-400'
                }`}>
                {lap.status}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-white font-bold text-base mb-1 group-hover:text-brand-300 transition-colors">{lap.nama}</h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-white/5 text-gray-400 text-[10px] font-semibold px-2 py-0.5 rounded border border-white/10 uppercase tracking-widest">{lap.jenis}</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Harga / Jam</p>
                  <p className="text-xl font-bold text-brand-400">{formatRupiah(lap.harga)}</p>
                </div>
                <div className="flex gap-2">
                  <button className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button className="w-9 h-9 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 flex items-center justify-center text-red-400 hover:text-red-300 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <polyline points="3,6 5,6 21,6" />
                      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-[#1a2332] rounded-2xl border border-white/10 w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Tambah Lapangan Baru</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1 block">Nama Lapangan</label>
                <input className="w-full bg-[#111827] border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500" placeholder="contoh: Lapangan Futsal C" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1 block">Jenis</label>
                  <select className="w-full bg-[#111827] border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500">
                    <option>Futsal</option><option>Mini Soccer</option><option>Badminton</option><option>Basket</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1 block">Harga / Jam</label>
                  <input type="number" className="w-full bg-[#111827] border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500" placeholder="150000" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1 block">Deskripsi</label>
                <textarea rows="3" className="w-full bg-[#111827] border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 resize-none" placeholder="Deskripsi singkat lapangan..." />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white border border-white/10 hover:bg-white/5 transition-colors">Batal</button>
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-brand-600 hover:bg-brand-500 transition-colors">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default KelolaLapangan;
