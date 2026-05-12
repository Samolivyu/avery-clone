import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { mockAuth } from '../../utils/auth'; 
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice';

const PinEntryForm = ({ onSuccess }) => {
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePinChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val) && val.length <= 6) {
      setPin(val);
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
      // Call mockAuth.loginWithPin
      const result = await mockAuth.loginWithPin(pin);
      
      if (result.success) {
        toast.success('PIN authentication successful');
        navigate('/products');
      } else {
        setError(result.error);
        toast.error(result.error);
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
      toast.error('Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-stone-50 min-h-screen flex items-center justify-center w-full">
      <div className="w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 sm:p-8">
          <div className="text-center">
            <img className="mx-auto h-12 w-auto mb-4" src="/images/aea-logo.webp" alt="Logo" />
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl">
              Enter PIN
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="pin" className="block mb-2 text-sm font-medium text-gray-900">Your PIN</label>
              <input
                type="password"
                id="pin"
                placeholder="••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
              >
                Clear
              </button>
            </div>
            <div className="mt-4 text-center">
              <button type="button" onClick={() => navigate('/login')} className="text-sm text-blue-600 hover:underline">
                Use Email/Password Instead
              </button>
              <p className="mt-2 text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-blue-600 hover:underline">Sign up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PinEntryForm;
