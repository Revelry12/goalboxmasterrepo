import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="tentang" className="hero-gradient text-white pt-16 lg:pt-20 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand Column */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path strokeWidth="2" d="M8 12l2-6h4l2 6-2 6h-4l-2-6z" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight uppercase">GoalBox</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Solusi digital pemesanan lapangan futsal terdepan. Menjadikan ekosistem olahraga yang modern dan efisien.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-600 hover:border-brand-600 transition-all">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Menu Utama */}
          <div>
            <h3 className="font-bold text-sm mb-5 tracking-wide text-white">Menu Utama</h3>
            <ul className="space-y-3">
              <li><a href="/#beranda" className="text-gray-400 hover:text-white text-sm transition-colors">Beranda</a></li>
              <li><a href="/#lapangan" className="text-gray-400 hover:text-white text-sm transition-colors">Lapangan</a></li>
              <li><a href="/#cara-pesan" className="text-gray-400 hover:text-white text-sm transition-colors">Cara Pesan</a></li>
              <li><a href="/#tentang" className="text-gray-400 hover:text-white text-sm transition-colors">Tentang Kami</a></li>
            </ul>
          </div>

          {/* Pusat Bantuan */}
          <div>
            <h3 className="font-bold text-sm mb-5 tracking-wide text-white">Pusat Bantuan</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Pusat Bantuan</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Syarat & Ketentuan</a></li>
            </ul>
          </div>

          {/* Kontak Kami */}
          <div>
            <h3 className="font-bold text-sm mb-5 tracking-wide text-white">Kontak Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-brand-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-400 text-sm">Email Support</span>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-brand-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                <span className="text-gray-400 text-sm">WhatsApp Support</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-gray-400 text-sm">Sudirman Central Business District, Batam</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-xs">
          <p>&copy; {new Date().getFullYear()} GoalBox Futsal. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
