import axios from 'axios';

export const TOKEN_KEY = 'authToken';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: { Accept: 'application/json' },
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem('authUser');
    }
    return Promise.reject(err);
  }
);

export const extractError = (err, fallback = 'Terjadi kesalahan, coba lagi.') => {
  if (err?.response?.data?.message) return err.response.data.message;
  if (err?.response?.data?.errors) {
    const first = Object.values(err.response.data.errors)[0];
    if (Array.isArray(first)) return first[0];
  }
  return fallback;
};
