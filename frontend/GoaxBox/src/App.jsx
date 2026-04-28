import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Detail from './pages/Detail';
import Booking from './pages/Booking';
import BookingHistory from './pages/BookingHistory';
import BookingDetail from './pages/BookingDetail';
import KelolaLapangan from './pages/admin/KelolaLapangan';
import KelolaBooking from './pages/admin/KelolaBooking';
import Pembayaran from './pages/admin/Pembayaran';
import Laporan from './pages/admin/Laporan';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isLoggedIn, isAdmin } = useAuth();
  const location = useLocation();
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <ProtectedRoute adminOnly>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/lapangan" element={
            <ProtectedRoute adminOnly>
              <KelolaLapangan />
            </ProtectedRoute>
          } />
          <Route path="/admin/bookings" element={
            <ProtectedRoute adminOnly>
              <KelolaBooking />
            </ProtectedRoute>
          } />
          <Route path="/admin/pembayaran" element={
            <ProtectedRoute adminOnly>
              <Pembayaran />
            </ProtectedRoute>
          } />
          <Route path="/admin/laporan" element={
            <ProtectedRoute adminOnly>
              <Laporan />
            </ProtectedRoute>
          } />
          <Route path="/detail/:id" element={
            <ProtectedRoute>
              <Detail />
            </ProtectedRoute>
          } />
          <Route path="/booking/:id" element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          } />
          <Route path="/bookings" element={
            <ProtectedRoute>
              <BookingHistory />
            </ProtectedRoute>
          } />
          <Route path="/bookings/:id" element={
            <ProtectedRoute>
              <BookingDetail />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
