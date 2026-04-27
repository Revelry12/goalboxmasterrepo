import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('authUser');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  });

  const login = (userData) => {
    localStorage.setItem('authUser', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('authUser');
    localStorage.removeItem('isLoggedIn');
    setUser(null);
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
