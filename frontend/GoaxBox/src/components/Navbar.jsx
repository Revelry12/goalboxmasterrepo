import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ className = '' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'navbar-scroll' : ''} ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path strokeWidth="2" d="M8 12l2-6h4l2 6-2 6h-4l-2-6z" />
              </svg>
            </div>
            <span className="text-white text-lg font-bold tracking-tight uppercase">GoalBox</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/#beranda" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Beranda</a>
            <a href="/#lapangan" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Lapangan</a>
            <a href="/#cara-pesan" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Cara Pesan</a>
            <a href="/#tentang" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Tentang Kami</a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="text-gray-300 hover:text-white transition-colors text-sm font-medium px-4 py-2">Masuk</Link>
            <Link to="/register" className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all hover:shadow-lg hover:shadow-brand-600/25">Daftar</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-navy-900/95 backdrop-blur-xl border-t border-white/10`}>
        <div className="px-6 py-4 space-y-3">
          <a href="/#beranda" className="block text-gray-300 hover:text-white transition-colors text-sm font-medium py-2">Beranda</a>
          <a href="/#lapangan" className="block text-gray-300 hover:text-white transition-colors text-sm font-medium py-2">Lapangan</a>
          <a href="/#cara-pesan" className="block text-gray-300 hover:text-white transition-colors text-sm font-medium py-2">Cara Pesan</a>
          <a href="/#tentang" className="block text-gray-300 hover:text-white transition-colors text-sm font-medium py-2">Tentang Kami</a>
          <hr className="border-white/10" />
          <Link to="/login" className="block text-gray-300 hover:text-white transition-colors text-sm font-medium py-2">Masuk</Link>
          <Link to="/register" className="block bg-brand-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg text-center">Daftar</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
