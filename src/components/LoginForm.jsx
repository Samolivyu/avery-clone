// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { authManager } from '../utils/auth.js'; // Corrected import path
import { toast } from 'sonner';

const LoginForm = ({ onLoginSuccess, onSwitchToRegister, onSwitchToPin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await authManager.login(email, password);
      if (result.success) {
        toast.success("Login successful");
        onLoginSuccess();
      } else {
        setError(result.error);
        toast.error("Login failed: " + result.error);
      }
    } catch (err) {
      setError("An error occurred during login");
      toast.error("An error occurred during login");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
   <section className="bg-stone-50 min-h-screen flex items-center justify-center">
  <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-xl shadow-md">
    
    {/* Header with Logo and Title */}
    <div className="text-center">
      <img 
        className="w-12 h-12 mx-auto mb-3" 
        src="/images/aea-logo.webp" 
        alt="Ibibe QA Kanban Logo" 
      />
      <h1 className="text-2xl font-bold text-gray-800">
        Sign In
      </h1>
      <p className="text-sm text-gray-500">
        Welcome back! Please enter your details.
      </p>
    </div>

    {/* Login Form */}
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label 
          htmlFor="email" 
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="w-full px-4 py-2 text-gray-800 bg-stone-100 border border-stone-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label 
          htmlFor="password" 
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="w-full px-4 py-2 text-gray-800 bg-stone-100 border border-stone-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {/* Error Message Display */}
      {error && (
        <div className="px-4 py-3 text-sm text-red-800 bg-red-100 border border-red-300 rounded-lg">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-5 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-gray-400"
        disabled={isLoading}
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>

      {/* Bottom Links */}
      <div className="text-sm text-center text-gray-600">
        <p>
          Don’t have an account yet?{' '}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onSwitchToRegister(); }}
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign up
          </a>
        </p>
        <p className="mt-2">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onSwitchToPin(); }}
            className="font-semibold text-blue-600 hover:underline"
          >
            Use PIN Instead
          </a>
        </p>
      </div>
    </form>
  </div>
</section>
  );
};

export default LoginForm;
