
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getCurrentUser, isAuthenticated, logout, User } from '../utils/auth';
import LoginForm from './LoginForm';
import TimeLoggerForm from './TimeLoggerForm';
import TimeLogsTable from './TimeLogsTable';

interface TimeLoggerProps {
  onClose: () => void;
}

const TimeLogger = ({ onClose }: TimeLoggerProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsLoggedIn(authenticated);
      
      if (authenticated) {
        setUser(getCurrentUser());
      } else {
        setUser(null);
      }
    };
    
    checkAuth();
  }, [refreshKey]);
  
  const handleLoginSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };
  
  const handleLogout = () => {
    logout();
    setRefreshKey(prev => prev + 1);
  };
  
  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md border border-gray-200">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-weightech-black">
          {isLoggedIn ? "Time Logger" : "Staff Login"}
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
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-xs text-gray-500 capitalize">Role: {user.role}</p>
              </div>
              <button 
                className="text-sm text-weightech-red hover:underline" 
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
            
            <TimeLoggerForm user={user} onRefresh={handleRefresh} />
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Recent Time Logs</h3>
              <TimeLogsTable userId={user.id} />
            </div>
          </>
        ) : (
          <LoginForm 
            onSuccess={handleLoginSuccess} 
            onCancel={onClose} 
          />
        )}
      </div>
    </div>
  );
};

export default TimeLogger;
