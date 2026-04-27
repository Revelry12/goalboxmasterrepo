import { createContext, useContext, useState } from 'react';
import { api, TOKEN_KEY, extractError } from '../lib/api';

const AuthContext = createContext(null);

const USER_KEY = 'authUser';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  });

  const persist = (userData, token) => {
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    if (token) localStorage.setItem(TOKEN_KEY, token);
    setUser(userData);
  };

  const clearLocal = () => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('isLoggedIn');
    setUser(null);
  };

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/login', { email, password });
      persist(data.user, data.token);
      return { ok: true, user: data.user };
    } catch (err) {
      return { ok: false, error: extractError(err, 'Email atau password salah.') };
    }
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch {
      // even if API fails, clear local
    } finally {
      clearLocal();
    }
  };

  const isLoggedIn = !!user;
  const role = user?.role ?? null;
  const isAdmin = role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, role, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
