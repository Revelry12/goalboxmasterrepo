import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { api, extractError } from '../lib/api';

const formatRupiah = (n) => {
  const num = typeof n === 'string' ? parseFloat(n) : n;
  if (Number.isNaN(num)) return '0';
  return Math.round(num).toLocaleString('id-ID');
};

const todayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const STEPS = [
  { id: 1, label: 'Pilih Waktu' },
  { id: 2, label: 'Pembayaran' },
  { id: 3, label: 'Konfirmasi' },
];

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [lapangan, setLapangan] = useState(null);
  const [loadingLapangan, setLoadingLapangan] = useState(true);
  const [pageError, setPageError] = useState('');

  const [step, setStep] = useState(1);

  // Step 1 — slot
  const [tanggal, setTanggal] = useState(todayStr());
  const [jamMulai, setJamMulai] = useState('');
  const [jamSelesai, setJamSelesai] = useState('');
  const [catatan, setCatatan] = useState('');
  const [booked, setBooked] = useState([]);
  const [availLoading, setAvailLoading] = useState(false);

  // Step 2 — payment
  const [metode, setMetode] = useState('transfer_manual');
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Step 3 — result
  const [resultBooking, setResultBooking] = useState(null);
  const [snapToken, setSnapToken] = useState(null);
  const [proofFile, setProofFile] = useState(null);
  const [proofMessage, setProofMessage] = useState('');
  const [proofError, setProofError] = useState('');
  const [proofLoading, setProofLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoadingLapangan(true);
    api.get(`/lapangan/${id}`)
      .then((res) => {
        if (!mounted) return;
        setLapangan(res.data?.data ?? null);
      })
      .catch((err) => {
        if (!mounted) return;
        setPageError(extractError(err, 'Gagal memuat lapangan.'));
      })
      .finally(() => {
        if (mounted) setLoadingLapangan(false);
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
      .catch(() => mounted && setBooked([]))
      .finally(() => mounted && setAvailLoading(false));
    return () => { mounted = false; };
  }, [lapangan?.id, tanggal]);

  const pricePerHour = useMemo(
    () => (lapangan?.harga_per_jam ? parseFloat(lapangan.harga_per_jam) : 0),
    [lapangan?.harga_per_jam]
  );

  const jamBuka = (lapangan?.jam_buka ?? '08:00:00').slice(0, 5);
  const jamTutup = (lapangan?.jam_tutup ?? '23:00:00').slice(0, 5);
  const jamBukaH = parseInt(jamBuka.split(':')[0], 10);
  const jamTutupH = parseInt(jamTutup.split(':')[0], 10);

  const slots = useMemo(() => {
    const arr = [];
    for (let h = jamBukaH; h < jamTutupH; h++) {
      const start = `${String(h).padStart(2, '0')}:00`;
      const end = `${String(h + 1).padStart(2, '0')}:00`;
      const isBooked = booked.some(b => {
        const bs = b.jam_mulai?.slice(0, 5);
        const be = b.jam_selesai?.slice(0, 5);
        return bs && be && start < be && end > bs;
      });
      arr.push({ start, end, isBooked });
    }
    return arr;
  }, [booked, jamBukaH, jamTutupH]);

  const toggleSlot = (slot) => {
    if (slot.isBooked) return;
    if (!jamMulai) {
      setJamMulai(slot.start);
      setJamSelesai(slot.end);
      return;
    }
    if (slot.start === jamMulai) {
      setJamMulai('');
      setJamSelesai('');
      return;
    }
    // extend selection: pick earliest start, latest end
    const startH = Math.min(parseInt(jamMulai.split(':')[0], 10), parseInt(slot.start.split(':')[0], 10));
    const endH = Math.max(parseInt(jamSelesai.split(':')[0], 10), parseInt(slot.end.split(':')[0], 10));

    // ensure no booked slot between
    let blocked = false;
    for (let h = startH; h < endH; h++) {
      const s = `${String(h).padStart(2, '0')}:00`;
      const e = `${String(h + 1).padStart(2, '0')}:00`;
      if (slots.find(x => x.start === s && x.end === e)?.isBooked) {
        blocked = true;
        break;
      }
    }
    if (blocked) {
      setJamMulai(slot.start);
      setJamSelesai(slot.end);
      return;
    }
    setJamMulai(`${String(startH).padStart(2, '0')}:00`);
    setJamSelesai(`${String(endH).padStart(2, '0')}:00`);
  };

  const isSlotSelected = (slot) => {
    if (!jamMulai || !jamSelesai) return false;
    return slot.start >= jamMulai && slot.end <= jamSelesai;
  };

  const durasi = jamMulai && jamSelesai
    ? parseInt(jamSelesai.split(':')[0], 10) - parseInt(jamMulai.split(':')[0], 10)
    : 0;
  const totalHarga = durasi * pricePerHour;

  const handleSubmitBooking = async () => {
    setSubmitError('');
    setSubmitting(true);
    try {
      const { data } = await api.post('/bookings', {
        lapangan_id: lapangan.id,
        tanggal,
        jam_mulai: jamMulai,
        jam_selesai: jamSelesai,
        metode,
        catatan: catatan || undefined,
      });
      setResultBooking(data.booking);
      if (data.snap_token) setSnapToken(data.snap_token);
      setStep(3);
    } catch (err) {
      setSubmitError(extractError(err, 'Gagal membuat booking.'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleUploadProof = async () => {
    if (!proofFile || !resultBooking) return;
    setProofError('');
    setProofMessage('');
    setProofLoading(true);
    try {
      const fd = new FormData();
      fd.append('bukti_bayar', proofFile);
      const { data } = await api.post(`/bookings/${resultBooking.id}/upload-proof`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setProofMessage(data.message || 'Bukti pembayaran terkirim.');
    } catch (err) {
      setProofError(extractError(err, 'Gagal mengunggah bukti.'));
    } finally {
      setProofLoading(false);
    }
  };

  if (loadingLapangan) {
    return (
      <div className="bg-[#060d1f] min-h-screen flex items-center justify-center text-gray-400">
        Memuat lapangan...
      </div>
    );
  }

  if (pageError || !lapangan) {
    return (
      <div className="bg-[#060d1f] min-h-screen flex flex-col">
        <Navbar className="bg-[#060d1f] border-b border-white/10 sticky top-0 z-50" />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <p className="text-red-400 font-medium mb-3">{pageError || 'Lapangan tidak ditemukan.'}</p>
            <Link to="/" className="text-brand-400 hover:text-brand-300 text-sm">← Kembali ke Beranda</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#060d1f] font-sans antialiased text-gray-300 flex flex-col min-h-screen">
      <Navbar className="bg-[#060d1f] border-b border-white/10 sticky top-0 z-50" />

      <div className="bg-[#060d1f] border-b border-white/10 pt-24 pb-8">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-6">
            <button
              onClick={() => (step > 1 ? setStep(step - 1) : navigate(-1))}
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 transition-colors group"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Kembali
            </button>
          </div>
          <div className="flex items-center justify-between">
            {STEPS.map((s, idx) => (
              <React.Fragment key={s.id}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
                    step >= s.id ? 'bg-brand-600 text-white' : 'bg-white/5 text-gray-600 border border-white/10'
                  }`}>
                    {step > s.id ? '✓' : s.id}
                  </div>
                  <span className={`text-xs font-semibold mt-2 ${step >= s.id ? 'text-white' : 'text-gray-600'}`}>
                    {s.label}
                  </span>
                </div>
                {idx < STEPS.length - 1 && (
                  <div className="flex-1 mx-3 h-0.5 -mt-6 rounded-full bg-white/10 relative">
                    <div className="absolute inset-y-0 left-0 bg-brand-600 rounded-full transition-all" style={{ width: step > s.id ? '100%' : '0%' }} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 lg:px-8 py-8 md:py-12">
        {/* Lapangan summary */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 flex items-center gap-4">
          <img src={lapangan.foto || '/image.png'} alt={lapangan.nama} className="w-20 h-20 rounded-xl object-cover" />
          <div className="flex-1">
            <h2 className="text-white font-bold text-lg">{lapangan.nama}</h2>
            <p className="text-gray-400 text-sm">{lapangan.jenis} · Buka {jamBuka} - {jamTutup}</p>
            <p className="text-brand-400 text-sm font-semibold mt-1">Rp {formatRupiah(pricePerHour)} / jam</p>
          </div>
        </div>

        {step === 1 && (
          <section className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Tanggal</label>
              <input
                type="date"
                min={todayStr()}
                value={tanggal}
                onChange={(e) => { setTanggal(e.target.value); setJamMulai(''); setJamSelesai(''); }}
                className="bg-[#0a1128] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-500 w-full max-w-xs"
              />
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Pilih Slot Jam (klik dua slot untuk durasi lebih dari 1 jam)</h3>
              {availLoading ? (
                <div className="text-gray-500 text-sm py-8 text-center">Mengecek ketersediaan...</div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {slots.map((slot) => {
                    const selected = isSlotSelected(slot);
                    return (
                      <button
                        key={slot.start}
                        type="button"
                        disabled={slot.isBooked}
                        onClick={() => toggleSlot(slot)}
                        className={`text-xs font-medium text-center py-3 rounded-lg border transition-colors ${
                          slot.isBooked
                            ? 'bg-white/5 text-gray-500 border-transparent line-through cursor-not-allowed'
                            : selected
                              ? 'bg-brand-600 text-white border-brand-500'
                              : 'bg-brand-900/30 text-brand-300 border-brand-500/20 hover:bg-brand-900/50'
                        }`}
                      >
                        {slot.start}
                      </button>
                    );
                  })}
                </div>
              )}
              <div className="flex items-center gap-4 mt-4 text-[11px] font-medium text-gray-400">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-brand-500"></div><span>TERSEDIA</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-brand-600"></div><span>DIPILIH</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full border border-gray-600"></div><span>SUDAH DIPESAN</span></div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Catatan (opsional)</label>
              <textarea
                rows={3}
                maxLength={500}
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                placeholder="Catatan untuk admin, mis. kebutuhan tertentu."
                className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="bg-gradient-to-br from-brand-900/40 to-[#111a36] border border-brand-500/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300 text-sm">Durasi</span>
                <span className="text-white font-semibold">{durasi} Jam</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-300 text-sm">Total</span>
                <span className="text-2xl font-extrabold text-white">Rp {formatRupiah(totalHarga)}</span>
              </div>
              <button
                disabled={!jamMulai || !jamSelesai}
                onClick={() => setStep(2)}
                className="w-full bg-brand-200 hover:bg-brand-300 disabled:bg-white/10 disabled:text-gray-500 text-brand-900 font-bold py-3.5 rounded-xl transition-colors disabled:cursor-not-allowed"
              >
                Lanjut ke Pembayaran
              </button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Data Pemesan</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Nama</p>
                  <p className="text-white font-medium">{user?.name ?? '-'}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Email</p>
                  <p className="text-white font-medium">{user?.email ?? '-'}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Ringkasan Booking</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-400">Lapangan</span><span className="text-white">{lapangan.nama}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Tanggal</span><span className="text-white">{tanggal}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Jam</span><span className="text-white">{jamMulai} - {jamSelesai}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Durasi</span><span className="text-white">{durasi} Jam</span></div>
                <div className="flex justify-between border-t border-white/10 pt-2 mt-2"><span className="text-gray-300 font-medium">Total</span><span className="text-white font-bold">Rp {formatRupiah(totalHarga)}</span></div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Metode Pembayaran</h3>
              <div className="space-y-3">
                <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${metode === 'transfer_manual' ? 'border-brand-500 bg-brand-900/20' : 'border-white/10 hover:border-white/20'}`}>
                  <input type="radio" name="metode" value="transfer_manual" checked={metode === 'transfer_manual'} onChange={(e) => setMetode(e.target.value)} className="mt-1" />
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm">Transfer Manual</p>
                    <p className="text-gray-400 text-xs mt-0.5">Upload bukti transfer setelah booking dibuat. Admin akan verifikasi manual.</p>
                  </div>
                </label>
                <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${metode === 'midtrans' ? 'border-brand-500 bg-brand-900/20' : 'border-white/10 hover:border-white/20'}`}>
                  <input type="radio" name="metode" value="midtrans" checked={metode === 'midtrans'} onChange={(e) => setMetode(e.target.value)} className="mt-1" />
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm">Midtrans (Snap)</p>
                    <p className="text-gray-400 text-xs mt-0.5">Bayar lewat virtual account / e-wallet. Memerlukan konfigurasi Midtrans di backend.</p>
                  </div>
                </label>
              </div>
            </div>

            {submitError && (
              <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400 text-sm">{submitError}</div>
            )}

            <button
              disabled={submitting}
              onClick={handleSubmitBooking}
              className="w-full bg-brand-200 hover:bg-brand-300 disabled:opacity-60 text-brand-900 font-bold py-3.5 rounded-xl transition-colors"
            >
              {submitting ? 'Memproses...' : 'Buat Booking'}
            </button>
          </section>
        )}

        {step === 3 && resultBooking && (
          <section className="space-y-6">
            <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Booking Berhasil Dibuat</h3>
              <p className="text-gray-400 text-sm mb-3">Kode booking</p>
              <p className="text-2xl font-mono font-bold text-emerald-300 mb-1">{resultBooking.kode_booking}</p>
              <p className="text-gray-500 text-xs">Status: {resultBooking.status_booking}</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-sm">
              <h3 className="text-white font-semibold mb-3">Detail</h3>
              <div className="space-y-2">
                <div className="flex justify-between"><span className="text-gray-400">Lapangan</span><span className="text-white">{resultBooking.lapangan?.nama}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Tanggal</span><span className="text-white">{resultBooking.tanggal}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Jam</span><span className="text-white">{resultBooking.jam_mulai?.slice(0,5)} - {resultBooking.jam_selesai?.slice(0,5)}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Total</span><span className="text-white font-bold">Rp {formatRupiah(resultBooking.total_harga)}</span></div>
              </div>
            </div>

            {metode === 'midtrans' && snapToken && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-sm">
                <h3 className="text-white font-semibold mb-3">Bayar via Midtrans</h3>
                <p className="text-gray-400 mb-3">Snap token sudah diterbitkan. Integrasikan Midtrans Snap.js untuk memproses pembayaran:</p>
                <p className="text-xs font-mono break-all text-brand-300 bg-[#0a1128] p-3 rounded">{snapToken}</p>
              </div>
            )}

            {metode === 'transfer_manual' && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-sm">
                <h3 className="text-white font-semibold mb-3">Upload Bukti Transfer</h3>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProofFile(e.target.files?.[0] ?? null)}
                  className="block w-full text-xs text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-brand-600 file:text-white file:font-semibold file:cursor-pointer"
                />
                {proofError && <p className="text-red-400 text-xs mt-2">{proofError}</p>}
                {proofMessage && <p className="text-emerald-400 text-xs mt-2">{proofMessage}</p>}
                <button
                  disabled={!proofFile || proofLoading}
                  onClick={handleUploadProof}
                  className="mt-4 w-full bg-brand-200 hover:bg-brand-300 disabled:opacity-60 text-brand-900 font-bold py-3 rounded-xl transition-colors"
                >
                  {proofLoading ? 'Mengunggah...' : 'Kirim Bukti Pembayaran'}
                </button>
              </div>
            )}

            <div className="flex gap-3">
              <Link to="/" className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-3 rounded-xl text-center transition-colors">
                Kembali ke Beranda
              </Link>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Booking;
