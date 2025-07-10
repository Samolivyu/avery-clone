// src/App.jsx
import React, { useState, useEffect, createContext } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from './store/slices/store';
import { loginSuccess, logout, setLoading, setError } from './store/slices/authSlice';
import { openModal, closeModal } from './store/slices/ui';
import { authManager } from './utils/auth.js';
import LoginForm from './components/LoginForm.jsx';
import SignUp from './components/SignUp.jsx';
import PinEntryForm from './components/PinEntryForm.jsx';
import TimeLogger from './components/TimeLogger.jsx';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Products from "./pages/Products.jsx";
import Services from "./pages/Services.jsx";
import NotFound from "./pages/NotFound.jsx";
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Toaster, toast } from 'sonner';

export const AppContext = createContext(null);


export default function App() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentUser = useSelector((state) => state.auth.user);
  const authLoading = useSelector((state) => state.auth.loading);
  const authError = useSelector((state) => state.auth.error);
  const timeLoggerModalOpen = useSelector((state) => state.ui.modals.timeLoggerModal?.isOpen || false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      dispatch(setLoading(true));
      try {
        const authenticated = await authManager.initialize();
        if (authenticated) {
          dispatch(loginSuccess({ user: authManager.getCurrentUser() }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Authentication initialization failed:", error);
        dispatch(setError("Failed to initialize authentication. Please try logging in again."));
        dispatch(logout());
      } finally {
        dispatch(setLoading(false));
      }
    };

    checkAuthStatus();
  }, [dispatch]);

  const handleAuthSuccess = (user) => {
    dispatch(loginSuccess({ user }));
    toast.success("Login successful!");
  };

  const handleLogout = async () => {
    dispatch(setLoading(true));
    try {
      await authManager.logout();
      dispatch(logout());
      toast.info("Logged out successfully.");
    } catch (error) {
      console.error("Logout failed:", error);
      dispatch(setError("Logout failed."));
      toast.error("Logout failed.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const switchToRegister = () => dispatch(setError(null));
  const switchToLogin = () => dispatch(setError(null));
  const switchToPin = () => dispatch(setError(null));

  const openTimeLogger = () => {
    dispatch(openModal({ name: 'timeLoggerModal' }));
  };

  const closeTimeLogger = () => {
    dispatch(closeModal('timeLoggerModal'));
  };

  // Always render BrowserRouter at the top level
  return (
    <Provider store={store}>
      <TooltipProvider>
        <Toaster position="top-right" richColors />
        <BrowserRouter> {/* BrowserRouter wraps everything */}
          <Navbar /> {/* Navbar is always visible */}

          {/* Conditional rendering of Routes based on authentication state */}
          {authLoading ? (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
              <p className="text-lg text-gray-700 dark:text-gray-300">Loading authentication...</p>
            </div>
          ) : !isAuthenticated ? (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
              {authError && (
                <div className="absolute top-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm z-50">
                  {authError}
                </div>
              )}
              <Routes>
                <Route path="/register" element={<SignUp onRegisterSuccess={handleAuthSuccess} onSwitchToLogin={switchToLogin} />} />
                <Route path="/login" element={<LoginForm onLoginSuccess={handleAuthSuccess} onSwitchToRegister={switchToRegister} onSwitchToPin={switchToPin} />} />
                <Route path="/pin" element={<PinEntryForm onSuccess={handleAuthSuccess} onSwitchToLogin={switchToLogin} />} />
                {/* Default to login if not authenticated and trying to access other routes */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </div>
          ) : (
            // Authenticated part of your app
            <Updates token={authManager.getAccessToken()}>
              <div className="App font-sans p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white min-h-screen">
                <Notifications />

                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/services" element={<Services />} />
                  {/* Redirect login/pin/register routes if already logged in */}
                  <Route path="/login" element={<Navigate to="/" replace />} />
                  <Route path="/pin" element={<Navigate to="/" replace />} />
                  <Route path="/register" element={<Navigate to="/" replace />} />

                  {/* Admin-specific route */}
                  {currentUser?.role === 'admin' && (
                    <Route path="/admin-dashboard" element={
                      <div className="p-6">
                        <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
                        <p>Welcome, Admin! Here you can manage users and system settings.</p>
                      </div>
                    } />
                  )}

                  <Route path="*" element={<NotFound />} />
                </Routes>

                {/* Time Logger button/modal trigger */}
                <div className="mt-8 text-center">
                  <button
                    onClick={openTimeLogger}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Open Time Logger
                  </button>
                </div>

                {/* Time Logger Modal */}
                {timeLoggerModalOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <TimeLogger onClose={closeTimeLogger} />
                  </div>
                )}

                {/* Logout button (redundant, also in Navbar) */}
                <button
                  onClick={handleLogout}
                  className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-900 w-full md:w-auto mx-auto block"
                >
                  Logout
                </button>
              </div>
            </Updates>
          )}
          <Footer /> {/* Footer is always visible */}
        </BrowserRouter>
      </TooltipProvider>
    </Provider>
  );
}
