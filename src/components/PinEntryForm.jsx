import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const PinEntryForm = () => {
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePinChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and limit to reasonable PIN length (e.g., 4-6 digits)
    if (/^\d*$/.test(value) && value.length <= 6) {
      setPin(value);
    }
  };

  const handleClear = () => {
    setPin('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (pin.length < 4) {
      toast.error('PIN must be at least 4 digits');
      return;
    }

    setIsLoading(true);
    
    try {
      // Add your PIN authentication logic here
      // Example: await authenticateWithPin(pin);
      
      toast.success('PIN authentication successful');
      // Redirect to TimeLogger component
      navigate('/time-logger');
      
    } catch (error) {
      toast.error('Invalid PIN. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Enter PIN</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="password"
            value={pin}
            onChange={handlePinChange}
            placeholder="Enter your PIN"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength="6"
            autoComplete="off"
          />
        </div>
        
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
      </form>
    </div>
  );
};

export default PinEntryForm;