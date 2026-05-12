// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { mockAuth } from '../../utils/auth';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice';  

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const result = await mockAuth.login(email, password);

      if (result.success) {
        // Update Redux store with the user data
        dispatch(loginSuccess(result.user));
        toast.success("Login successful");
        navigate('/');  // or '/dashboard'
      } else {
        const msg = result.error || "Login failed";
        setError(msg);
        toast.error("Login failed: " + msg);
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
    <section className="bg-stone-50 min-h-screen flex items-center justify-center w-full">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="text-center">
            <img className="mx-auto h-12 w-auto mb-4" src="/images/aea-logo.webp" alt="Logo" />
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
          </div>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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

            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-500">Remember me</label>
                </div>
              </div>
              <a href="#" className="text-sm font-medium text-primary-600 hover:underline">Forgot password?</a>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-white bg-avery-red bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-400"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
            
            <p className="text-sm font-light text-gray-500">
              Don’t have an account yet?{' '}
              <Link to="/signup" className="font-medium text-primary-600 hover:underline">Sign up</Link>
            </p>
            <p className="text-sm font-light text-gray-500">
              <Link to="/pin" className="font-medium text-primary-600 hover:underline">Use PIN Instead</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;