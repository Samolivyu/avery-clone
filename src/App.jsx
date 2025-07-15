// src/App.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { loginSuccess, logoutSuccess, loginFailure } from './store/slices/authSlice';
import { openModal, closeModal } from './store/slices/ui';
import { authManager } from './utils/auth';
import SignUp from './components/auth/SignUp.jsx';
import LoginForm from './components/auth/LoginForm.jsx';
import PinEntryForm from './components/auth/PinEntryForm.jsx';
import Home from './components/Home.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Products from './pages/Products.jsx';
import Services from './pages/Services.jsx';
import NotFound from './pages/NotFound.jsx';
import TimeLogger from './components/TimeLogger.jsx';
import { Toaster, toast } from 'sonner';
import { TooltipProvider } from '@radix-ui/react-tooltip';

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const loading = useSelector(state => state.auth.loading);
  const authError = useSelector((state) => state.auth.error);
  const timeLoggerModalOpen = useSelector(
    state => state.ui.modals.timeLoggerModal?.isOpen || false
  );

  const [authInitialized, setAuthInitialized] = useState(false); // Track auth initialization

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const isAuthenticatedUser  = await authManager.initialize();
        if (isAuthenticatedUser ) {
          dispatch(loginSuccess(authManager.user));
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        dispatch(loginFailure('Authentication initialization failed'));
      } finally {
        setAuthInitialized(true); // Mark auth as initialized
      }
    };

    initializeAuth();
  }, [dispatch]);

  const handleLoginSuccess = () => {
    dispatch(loginSuccess(authManager.user));
    navigate('/time-logger');
  };

  const handleRegisterSuccess = () => {
    toast.success("Registration successful! Please log in.");
    navigate('/login');
  };

  const handleLogout = async () => {
    await authManager.logout();
    dispatch(logoutSuccess());
    toast.info("You have been logged out.");
    navigate('/login');
  };

  const openTimeLogger = () => {
    dispatch(openModal('timeLoggerModal'));
  };

  const closeTimeLogger = () => {
    dispatch(closeModal('timeLoggerModal'));
  };

  if (!authInitialized || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading application...</p>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <Navbar />
      <Toaster position="top-right" richColors />

      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<SignUp onRegisterSuccess={handleRegisterSuccess} />} />
            <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/pin-login" element={<PinEntryForm onSuccess={handleLoginSuccess} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/time-logger" element={<TimeLogger onClose={closeTimeLogger} onLogout={handleLogout} />} />
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/pin-login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>

      {isAuthenticated && (
        <div className="mt-8 text-center">
          <button
            onClick={openTimeLogger}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Open Time Logger
          </button>
        </div>
      )}

      {timeLoggerModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <TimeLogger onClose={closeTimeLogger} />
        </div>
      )}

      {isAuthenticated && (
        <button
          onClick={handleLogout}
          className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-900 w-full md:w-auto mx-auto block"
        >
          Logout
        </button>
      )}
      <Footer />
    </TooltipProvider>
  );
}
