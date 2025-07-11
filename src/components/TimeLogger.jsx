// src/components/TimeLogger.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Download, UserPlus } from 'lucide-react'; // fixed UserPlus import
import { authManager } from '../utils/auth';
import TimeLogsTable from './dashboard/TimeLogsTable';
import { toast } from 'sonner';

const TimeLogger = ({ onLogout }) => {
  const [user, setUser ] = useState(null);
  const [activeLog, setActiveLog] = useState(null);
  const [activeBreak, setActiveBreak] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  // Redirect if not authenticated; else load status
  useEffect(() => {
    const currentUser  = authManager.getCurrentUser ();
    if (!currentUser ) {
      navigate('/login');
      return;
    }
    setUser (currentUser );

    const fetchStatus = async () => {
      try {
        const logRes = await authManager.getActiveLog();
        setActiveLog(logRes.activeLog || null);
        const breakRes = await authManager.getActiveBreak();
        setActiveBreak(breakRes.activeBreak || null);
      } catch (err) {
        console.error('Failed to fetch active time status:', err);
        toast.error('Failed to load active time status.');
        setActiveLog(null);
        setActiveBreak(null);
      }
    };
    fetchStatus();
  }, [refreshKey, navigate]);

  // Live clock
  useEffect(() => {
    const id = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const handleRefresh = () => setRefreshKey(k => k + 1);

  const handleAction = async (action, notes = '') => {
    if (!user) {
      toast.error('User  not logged in.');
      return;
    }
    try {
      switch (action) {
        case 'clockIn':
          await authManager.clockIn(notes);
          toast.success('Clocked in successfully');
          break;
        case 'clockOut':
          await authManager.clockOut(notes);
          toast.success('Clocked out successfully');
          break;
        case 'startBreak':
          await authManager.startBreak(notes);
          toast.success('Break started');
          break;
        case 'endBreak':
          await authManager.endBreak(notes);
          toast.success('Break ended');
          break;
        default:
          return;
      }
      handleRefresh();
    } catch (err) {
      console.error('Time action error:', err);
      toast.error(err.message || 'An error occurred');
    }
  };

  const formatTime = dt =>
    dt.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

  if (!user) {
    return <p className="text-gray-500 text-center my-4">Redirecting to login...</p>;
  }

  // Compute display name from firstName/lastName
  const userName = `${user.firstName || ''} ${user.lastName || ''}`.trim();

  return (
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md border border-gray-200 mx-auto my-8">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Employee Time Clock</h2>
        <button className="text-gray-500 hover:text-gray-700" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="p-4">
        <div className="mb-4 text-center">
          <p className="mb-2">Current Time: {formatTime(currentDateTime)}</p>
        </div>

        <div className="flex justify-between items-center mb-4 flex-wrap">
          <div>
            <p className="font-medium text-gray-900">{userName}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-xs text-gray-500 capitalize">ID: {user.userId}</p>
          </div>
          <div className="space-y-2 mt-2 md:mt-0">
            {user.role === 'admin' && (
              <>
                <button
                  onClick={() => authManager.downloadAllRecords()}
                  className="flex items-center text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                >
                  <Download size={16} className="mr-1" />
                  Download Records
                </button>
                <button
                  className="flex items-center text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                >
                  <User Plus size={16} className="mr-1" />
                  Add Employee
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={() => handleAction('clockIn', 'Starting shift')}
            disabled={!!activeLog}
            className={`py-2 text-white rounded-md focus:outline-none ${
              !activeLog ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Clock In
          </button>
          <button
            onClick={() => handleAction('clockOut', 'Ending shift')}
            disabled={!activeLog || !!activeBreak}
            className={`py-2 text-white rounded-md focus:outline-none ${
              activeLog && !activeBreak ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Clock Out
          </button>
          <button
            onClick={() => handleAction('startBreak', 'Break started')}
            disabled={!activeLog || !!activeBreak}
            className={`py-2 text-white rounded-md focus:outline-none ${
              activeLog && !activeBreak ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Start Break
          </button>
          <button
            onClick={() => handleAction('endBreak', 'Break ended')}
            disabled={!activeBreak}
            className={`py-2 text-white rounded-md focus:outline-none ${
              activeBreak ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            End Break
          </button>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Today's Time Cards</h3>
          <TimeLogsTable userId={user.userId} showTodayOnly={true} refreshKey={refreshKey} />
        </div>
      </div>
    </div>
  );
};

export default TimeLogger;
