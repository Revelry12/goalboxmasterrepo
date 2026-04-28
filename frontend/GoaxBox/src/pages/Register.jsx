import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, extractError } from '../lib/api';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
  });

  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!agreed) {
      setError('Anda harus menyetujui Syarat & Ketentuan untuk melanjutkan.');
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setError('Konfirmasi password tidak cocok.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // The endpoint defined in routes/api.php is /register
      await api.post('/register', formData);
      // If success, navigate to login
      navigate('/login', { state: { message: 'Registrasi berhasil! Silakan masuk.' }, replace: true });
    } catch (err) {
      setError(extractError(err, 'Terjadi kesalahan saat registrasi. Silakan coba lagi.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen font-sans antialiased bg-white">
      {/* Left Panel - Branding (Identical to Login) */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[42%] login-gradient relative overflow-hidden flex-col justify-between p-10 xl:p-14">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-brand-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-10 w-40 h-40 bg-brand-400/3 rounded-full blur-2xl animate-float"></div>

        {/* Logo */}
        <div className="relative z-10 animate-fade-in-left">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10">
              <img src="/Icon.svg" alt="GoalBox Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-white text-xl font-bold tracking-tight">GoalBox</span>
          </Link>
        </div>

        {/* Main Text */}
        <div className="relative z-10 -mt-10">
          <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-6 animate-fade-in-left delay-100" style={{ opacity: 0 }} data-animate="true">
            Tingkatkan Performa<br />Futsal Anda
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-md animate-fade-in-left delay-200" style={{ opacity: 0 }} data-animate="true">
            Bergabunglah di arena digital utama. Pesan lapangan terbaik, kelola liga, dan terhubung dengan komunitas dalam satu aplikasi berperforma tinggi.
          </p>
        </div>

        {/* Feature Cards / Stats */}
        <div className="relative z-10 grid grid-cols-2 gap-4">
          <div className="bg-[#0a1128] rounded-xl p-6 border border-white/5 animate-fade-in-left delay-300" style={{ opacity: 0 }} data-animate="true">
            <h3 className="text-white text-3xl font-bold mb-1">450+</h3>
            <p className="text-gray-500 text-[10px] font-semibold uppercase tracking-wider">Lapangan Aktif</p>
          </div>

          <div className="bg-[#0a1128] rounded-xl p-6 border border-white/5 animate-fade-in-left delay-400" style={{ opacity: 0 }} data-animate="true">
            <h3 className="text-white text-3xl font-bold mb-1">12K+</h3>
            <p className="text-gray-500 text-[10px] font-semibold uppercase tracking-wider">Pemain Online</p>
          </div>
        </div>
        
        <div className="relative z-10 text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-8">
          &copy; 2024 EKOSISTEM FUTSAL GOALBOX
        </div>
      </div>

      {/* Right Panel - Register Form */}
      <div className="flex-1 flex flex-col bg-white overflow-y-auto">
        {/* Back to Home */}
        <div className="flex justify-end p-6 lg:p-8">
          <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors text-sm font-medium group">
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Kembali ke Beranda
          </Link>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex flex-col justify-center px-6 lg:px-12 xl:px-20 max-w-2xl mx-auto w-full py-8">
          <div className="w-full animate-fade-in-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Buat Akun Baru</h2>
            <p className="text-gray-500 mb-8">
              Sudah punya akun?{' '}
              <Link to="/login" className="text-brand-600 font-semibold hover:text-brand-700 transition-colors">Masuk</Link>
            </p>

            {/* Error Messages */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-scale-in">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  <span className="text-red-600 text-sm font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-sm font-semibold text-gray-700">Google</span>
              </button>
              <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="text-sm font-semibold text-gray-700">Facebook</span>
              </button>
            </div>

            <div className="relative flex items-center mb-6">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-semibold uppercase tracking-wider">Atau daftar dengan email</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <form onSubmit={handleRegister}>
              {/* Nama Lengkap */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Nama Lengkap</label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-gray-50 border-transparent focus:bg-white border focus:border-brand-500 rounded-xl px-4 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none transition-colors text-sm font-medium"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full bg-gray-50 border-transparent focus:bg-white border focus:border-brand-500 rounded-xl px-4 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none transition-colors text-sm font-medium"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Nomor HP Field */}
              <div className="mb-4">
                <label htmlFor="phone" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Nomor HP</label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0812 3456 7890"
                    className="w-full bg-gray-50 border-transparent focus:bg-white border focus:border-brand-500 rounded-xl px-4 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none transition-colors text-sm font-medium"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                      <line x1="12" y1="18" x2="12.01" y2="18" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-gray-50 border-transparent focus:bg-white border focus:border-brand-500 rounded-xl px-4 py-3.5 pr-12 text-gray-900 placeholder-gray-400 focus:outline-none transition-colors text-sm font-medium"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                    )}
                  </button>
                </div>
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${formData.password.length > 7 ? 'bg-brand-500 w-full' : 'bg-orange-400 w-1/2'}`}
                      ></div>
                    </div>
                    <span className="text-[10px] font-bold text-brand-600 uppercase">
                      {formData.password.length > 7 ? 'Kuat' : 'Sedang'}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="mb-6">
                <label htmlFor="password_confirmation" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Konfirmasi Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-gray-50 border-transparent focus:bg-white border focus:border-brand-500 rounded-xl px-4 py-3.5 pr-12 text-gray-900 placeholder-gray-400 focus:outline-none transition-colors text-sm font-medium"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* T&C Checkbox */}
              <div className="flex items-start mb-6">
                <input
                  type="checkbox"
                  id="agreed"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-gray-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                />
                <label htmlFor="agreed" className="ml-3 text-xs text-gray-500 cursor-pointer select-none leading-relaxed">
                  Saya setuju dengan <a href="#" className="text-brand-600 font-semibold hover:underline">Syarat & Ketentuan</a> serta <a href="#" className="text-brand-600 font-semibold hover:underline">Kebijakan Privasi</a> GoalBox.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-[#0a3a8a] hover:bg-brand-700 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Memproses...</span>
                  </>
                ) : (
                  <span>Daftar Sekarang</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
