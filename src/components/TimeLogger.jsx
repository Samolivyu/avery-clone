
import React, { useState, useEffect } from 'react';
import { X, Download, UserPlus } from 'lucide-react';
import {   getCurrentUser,   isAuthenticated,   logout,   loginWithPin,  clockIn,  clockOut,
  startBreak,   endBreak,   getActiveLog,   getActiveBreak,   downloadAllRecords} from '../utils/auth';
import LoginForm from './LoginForm';
import TimeLogsTable from './TimeLogsTable';
import PinEntryForm from './PinEntryForm';
import { toast } from 'sonner';

const TimeLogger = ({ onClose }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [viewMode, setViewMode] = useState('pin'); // 'pin', 'login', or 'dashboard'
  const [activeLog, setActiveLog] = useState(null);
  const [activeBreak, setActiveBreak] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsLoggedIn(authenticated);
      
      if (authenticated) {
        const currentUser = getCurrentUser();
        setUser(currentUser);
        
        // Check for active logs and breaks
        setActiveLog(getActiveLog(currentUser.id));
        setActiveBreak(getActiveBreak(currentUser.id));
        
        setViewMode('dashboard');
      } else {
        setUser(null);
        setViewMode('pin');
      }
    };
    
    checkAuth();
  }, [refreshKey]);
  
  // Update current time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const handleLoginSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };
  
  const handlePinEntry = (pin) => {
    try {
      const token = loginWithPin(pin);
      if (token) {
        toast.success("Login successful");
        handleLoginSuccess();
      } else {
        toast.error("Invalid PIN");
      }
    } catch (err) {
      toast.error("Login failed");
      console.error(err);
    }
  };
  
  const handleLogout = () => {
    logout();
    setRefreshKey(prev => prev + 1);
  };
  
  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };
  
  const handleAction = async (action, notes = "") => {
    if (!user) return;
    
    try {
      switch (action) {
        case 'clockIn':
          clockIn(user.id, notes);
          toast.success("Clocked in successfully");
          break;
        case 'clockOut':
          clockOut(user.id, notes);
          toast.success("Clocked out successfully");
          break;
        case 'startBreak':
          startBreak(user.id, notes);
          toast.success("Break started");
          break;
        case 'endBreak':
          endBreak(user.id, notes);
          toast.success("Break ended");
          break;
        default:
          break;
      }
      
      handleRefresh();
    } catch (err) {
      toast.error(err.message || "An error occurred");
    }
  };
  
  const formatTime = (date) => {
    return date.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md border border-gray-200">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-avery-black">
          {isLoggedIn ? "Employee Time Clock" : "Staff Login"}
        </h2>
        <button 
          className="text-gray-500 hover:text-gray-700" 
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="p-4">
        {isLoggedIn && user ? (
          <>
            <div className="mb-4">
              <p className="text-center mb-2">Current Time: {formatTime(currentDateTime)}</p>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-xs text-gray-500 capitalize">ID: {user.employeeId}</p>
                </div>
                <div className="space-y-2">
                  {user.role === 'admin' && (
                    <>
                      <button 
                        onClick={downloadAllRecords}
                        className="flex items-center text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        <Download size={16} className="mr-1" />
                        Download Records
                      </button>
                      <button 
                        className="flex items-center text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        <UserPlus size={16} className="mr-1" />
                        Add Employee
                      </button>
                    </>
                  )}
                  <button 
                    className="flex items-center text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                onClick={() => handleAction('clockIn')}
                disabled={!!activeLog}
                className={`py-2 text-white rounded-md focus:outline-none ${
                  !activeLog 
                    ? "bg-blue-500 hover:bg-blue-600" 
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Clock In
              </button>
              
              <button
                onClick={() => handleAction('clockOut')}
                disabled={!activeLog || !!activeBreak}
                className={`py-2 text-white rounded-md focus:outline-none ${
                  activeLog && !activeBreak
                    ? "bg-blue-500 hover:bg-blue-600" 
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Clock Out
              </button>
              
              <button
                onClick={() => handleAction('startBreak')}
                disabled={!activeLog || !!activeBreak}
                className={`py-2 text-white rounded-md focus:outline-none ${
                  activeLog && !activeBreak
                    ? "bg-blue-500 hover:bg-blue-600" 
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Start Break
              </button>
              
              <button
                onClick={() => handleAction('endBreak')}
                disabled={!activeBreak}
                className={`py-2 text-white rounded-md focus:outline-none ${
                  activeBreak
                    ? "bg-blue-500 hover:bg-blue-600" 
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                End Break
              </button>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Today's Time Cards</h3>
              <TimeLogsTable userId={user.id} showTodayOnly={true} />
            </div>
          </>
        ) : (
          <>
            {viewMode === 'pin' ? (
              <div>
                <PinEntryForm onSuccess={handlePinEntry} onSwitchToLogin={() => setViewMode('login')} />
              </div>
            ) : (
              <LoginForm 
                onSuccess={handleLoginSuccess} 
                onCancel={onClose}
                onSwitchToPin={() => setViewMode('pin')}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TimeLogger;
