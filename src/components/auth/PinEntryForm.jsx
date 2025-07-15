// src/components/auth/PinEntryForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { authManager } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

const PinEntryForm = ({ onSuccess }) => {
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const isMounted = useRef(true); // Track if the component is mounted

  useEffect(() => {
    return () => {
      isMounted.current = false; // Set to false on unmount
    };
  }, []);

  const handlePinChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 6) {
      setPin(value);
    }
  };

  const handleClear = () => {
    setPin('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (pin.length < 4) {
      setError('PIN must be at least 4 digits');
      toast.error('PIN must be at least 4 digits');
      return;
    }

    setIsLoading(true);

    try {
      const result = await authManager.loginWithPin(pin);
      if (result.success && isMounted.current) {
        toast.success('PIN authentication successful');
        onSuccess();
      } else if (isMounted.current) {
        setError(result.error);
        toast.error('Invalid PIN: ' + result.error);
      }
    } catch (err) {
      if (isMounted.current) {
        setError('An error occurred during PIN login.');
        toast.error('An error occurred during PIN login.');
        console.error(err);
      }
    } finally {
      if (isMounted.current) setIsLoading(false);
    }
  };

  return (
    <section className="bg-stone-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-xl shadow-md">

        <div className="text-center">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
            Enter PIN
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="pin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your PIN
            </label>
            <input
              type="password" // Use type="password" for sensitive PIN entry
              name="pin"
              id="pin"
              placeholder="••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              maxLength="6"
              value={pin}
              onChange={handlePinChange}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="flex space-x-2">
            <button
              type="submit"
              disabled={isLoading || pin.length < 4}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
              {isLoading ? 'Verifying...' : 'Submit'}
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
              disabled={isLoading}
            >
              Clear
            </button>
          </div>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => {
                handleClear(); // Clear the PIN input
                navigate('/login'); // Use navigate directly
              }}
              className="text-sm text-blue-600 hover:underline"
            >
              Use Email/Password Instead
            </button>
            <p className="mt-2 text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')} // Updated from '/' to '/register' for clarity
                className="font-medium text-blue-600 hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PinEntryForm;
