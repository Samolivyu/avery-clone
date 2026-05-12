import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Services from './pages/Services';
import Products from './pages/Products';
import LoginForm from './components/auth/LoginForm';
import SignUp from './components/auth/SignUp';
import PinEntryForm from './components/auth/PinEntryForm';
import TimeLogger from './components/TimeLog';
import NotFound from './pages/NotFound';
import { Link } from 'react-router-dom'
import { Toaster } from 'sonner';

export default function App() {
  // Read authentication state from Redux store
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />
      <div className="min-h-screen flex flex-col pt-[88px]">
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/products" element={<Products />} />
              <Route path="/time" element={<TimeLogger />} />
              <Route path="/login" element={<Navigate to="/" replace />} />
              <Route path="/signup" element={<Navigate to="/" replace />} />
              <Route path="/pin" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route
                path="/login"
                element={<LoginForm />}
              />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/pin"
                element={<PinEntryForm />}
              />
              <Route path="*" element={<NotFound />} />
            </>
          )}
        </Routes>
      </div>
      <Footer />
    </>
  );
}