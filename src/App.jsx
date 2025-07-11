import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { loginSuccess, logoutSuccess, loginFailure } from './store/slices/authSlice';
import { authManager } from './utils/auth';
import SignUp from './components/auth/SignUp.jsx';
import LoginForm from './components/auth/LoginForm.jsx';
import PinEntryForm from './components/auth/PinEntryForm.jsx';
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import TimeLogger from "./components/TimeLogger.jsx"; // Make sure to import TimeLogger

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(state => state.auth);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const isAuthenticated = await authManager.initialize();
        if (isAuthenticated) {
          dispatch(loginSuccess(authManager.user));
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        dispatch(loginFailure("Authentication initialization failed"));
      }
    };
    
    initializeAuth();
  }, [dispatch]);

  const handleLoginSuccess = (user) => {
    dispatch(loginSuccess(user));
  };

  const handleRegisterSuccess = () => {
    // After registration, redirect to login
    return <Navigate to="/login" replace />;
  };

  const handleLogout = async () => {
    await authManager.logout();
    dispatch(logoutSuccess());
    return <Navigate to="/login" replace />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        {!isAuthenticated ? (
          <>
            {/* SignUp as the default page */}
            <Route path="/" element={<SignUp onRegisterSuccess={handleRegisterSuccess} />} />
            <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/pin-login" element={<PinEntryForm onSuccess={handleLoginSuccess} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/time-logger" element={<TimeLogger onLogout={handleLogout} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;