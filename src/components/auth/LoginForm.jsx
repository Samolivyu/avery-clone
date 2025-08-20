// src/components/auth/LoginForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import { authManager } from '../../utils/auth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const isMounted = useRef(true); // Track if the component is mounted

  useEffect(() => {
    return () => {
      isMounted.current = false; // Set to false on unmount
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await authManager.login(email, password);
      if (result.success && isMounted.current) {
        toast.success("Login successful");
        onLoginSuccess();
      } else if (isMounted.current) {
        setError(result.error);
        toast.error("Login failed: " + result.error);
      }
    } catch (err) {
      if (isMounted.current) {
        setError("An error occurred during login");
        toast.error("An error occurred during login");
        console.error(err);
      }
    } finally {
      if (isMounted.current) setIsLoading(false);
    }
  };

  return (
    <section className="bg-stone-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-xl shadow-md">

        {/* Header with Logo and Title */}
        <div className="text-center">
          <img
            className="mx-auto h-12 w-auto mb-4"
            src="/path/to/your/logo.png" 
            alt="Logo"
          />
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
        </div>

        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              <button
                onClick={() => navigate('/register')} 
                className="font-semibold text-blue-600 hover:underline"
              >
                Sign up
              </button>
            </p>
            <p className="mt-2">
              <button
                onClick={() => navigate('/pin')} 
                className="font-semibold text-blue-600 hover:underline"
              >
                Use PIN Instead
              </button>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
