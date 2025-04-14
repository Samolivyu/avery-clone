
import React, { useState } from 'react';

const PinEntryForm = ({ onSuccess, onSwitchToLogin }) => {
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleNumberPress = (num) => {
    if (pin.length < 4) {
      setPin(prev => prev + num);
    }
  };
  
  const handleClear = () => {
    setPin('');
  };
  
  const handleSubmit = (e) => {
    e && e.preventDefault();
    
    if (pin.length === 0) return;
    
    setIsLoading(true);
    
    // Small delay to simulate processing
    setTimeout(() => {
      onSuccess(pin);
      setIsLoading(false);
      setPin('');
    }, 300);
  };
  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Employee Time Clock</h2>
      
      <div className="mb-6">
        <p className="text-center text-gray-600 mb-2">Enter Your PIN</p>
        
        <div className="flex justify-center mb-4">
          <input
            type="password"
            value={pin}
            readOnly
            className="text-center w-full max-w-[200px] p-2 border border-gray-300 rounded"
            placeholder="Enter PIN"
          />
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
          >
            Clear
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mb-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button
            key={num}
            onClick={() => handleNumberPress(num.toString())}
            className="w-full aspect-square flex items-center justify-center border border-gray-300 rounded text-xl hover:bg-gray-100"
          >
            {num}
          </button>
        ))}
        <div></div>
        <button
          onClick={() => handleNumberPress('0')}
          className="w-full aspect-square flex items-center justify-center border border-gray-300 rounded text-xl hover:bg-gray-100"
        >
          0
        </button>
        <div></div>
      </div>
      
      <div className="flex flex-col gap-2">
        <button
          onClick={handleSubmit}
          disabled={isLoading || pin.length === 0}
          className={`py-2 w-full bg-blue-500 text-white rounded-md 
            ${(isLoading || pin.length === 0) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        >
          {isLoading ? "Submitting..." : "Clock In"}
        </button>
        
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-sm text-center text-weightech-red hover:underline mt-2"
        >
          Login with Email Instead
        </button>
      </div>
    </div>
  );
};

export default PinEntryForm;
