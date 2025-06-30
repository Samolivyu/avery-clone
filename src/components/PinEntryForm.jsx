import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authManager } from '../utils/auth';
import { toast } from 'sonner';

const PinEntryForm = () => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await authManager.loginWithPin(pin);
      
      if (result.success) {
        toast.success('PIN authentication successful');
        navigate('/time-logger'); // Redirect to TimeLogger
      } else {
        setError(result.error || 'Invalid PIN');
        toast.error('PIN verification failed');
      }
    } catch (err) {
      setError('PIN authentication failed. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      setPin(value);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Enter PIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="pin"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              PIN
            </label>
            <input
              type="password"
              id="pin"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={pin}
              onChange={handlePinChange}
              maxLength="4"
              placeholder="••••"
              required
              autoComplete="off"
            />
          </div>
          {error && (
            <p className="text-red-500 text-xs italic mb-4">{error}</p>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            disabled={pin.length !== 4 || isLoading}
          >
            {isLoading ? "Verifying..." : "Verify PIN"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PinEntryForm;