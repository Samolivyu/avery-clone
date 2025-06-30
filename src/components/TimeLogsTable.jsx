// src/components/dashboard/TimeLogsTable.jsx
import React, { useState, useEffect } from 'react';
import { authManager } from '../utils/auth'; // Use the consolidated auth.js
import { toast } from 'sonner';

const TimeLogsTable = ({ userId, showTodayOnly = false, refreshKey }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        let fetchedLogs = [];
        // Assuming your authManager has methods to fetch logs from backend
        // This is a placeholder. You'll need actual backend endpoints for these.
        // For demonstration, I'll use a mock array if backend fetching isn't fully set up.
        // In a real app, you'd call authManager.getUserLogs or a specific endpoint.

        const response = await authManager.getUserLogs(userId); // This method should fetch logs from your backend
        if (response.data && response.data.logs) {
            fetchedLogs = response.data.logs;
        } else {
            // Mock data for development if backend isn't ready
            console.warn("Using mock time logs. Implement backend fetching for /time/logs/:userId.");
            fetchedLogs = [
                { id: 'mock1', userId: 'user123', clockIn: '2025-06-25T08:00:00Z', clockOut: '2025-06-25T12:00:00Z', ip: '192.168.1.1' },
                { id: 'mock2', userId: 'user123', clockIn: '2025-06-25T13:00:00Z', clockOut: null, ip: '192.168.1.1' },
                { id: 'mock3', userId: 'user456', clockIn: '2025-06-24T09:00:00Z', clockOut: '2025-06-24T17:00:00Z', ip: '192.168.1.2' },
            ].filter(log => log.userId === userId);
        }

        if (showTodayOnly) {
          const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
          fetchedLogs = fetchedLogs.filter(log => log.clockIn.startsWith(today));
        }
        setLogs(fetchedLogs);
      } catch (err) {
        setError("Failed to fetch time logs.");
        toast.error("Failed to fetch time logs.");
        console.error("Error fetching time logs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [userId, showTodayOnly, refreshKey]); // Re-fetch when userId or refreshKey changes

  // Sort logs by clock-in time, most recent first
  const sortedLogs = [...logs].sort((a, b) => {
    return new Date(b.clockIn).getTime() - new Date(a.clockIn).getTime();
  });
  
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
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
  
  // This function might be useful for a total duration display, not directly used in the table rows
  const formatDuration = (minutes) => {
    if (minutes === null) return "-";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  if (loading) {
    return <p className="text-gray-500 text-center my-4">Loading time logs...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center my-4">{error}</p>;
  }

  if (sortedLogs.length === 0) {
    return <p className="text-gray-500 text-center my-4">No time logs found for today.</p>;
  }
  
  return (
    <div className="mt-4 overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              Action
            </th>
            <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              Time
            </th>
            <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              IP
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedLogs.map(log => (
            <React.Fragment key={log.id}>
              {/* Clock In row */}
              <tr className="hover:bg-gray-50">
                <td className="py-2 px-4 text-sm text-gray-900 border-b">
                  ClockIn
                </td>
                <td className="py-2 px-4 text-sm text-gray-900 border-b">
                  {formatDate(log.clockIn)}
                </td>
                <td className="py-2 px-4 text-sm text-gray-900 border-b">
                  {log.ip || "-"}
                </td>
              </tr>
              
              {/* Clock Out row (if clocked out) */}
              {log.clockOut && (
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="py-2 px-4 text-sm text-gray-900">
                    ClockOut
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-900">
                    {formatDate(log.clockOut)}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-900">
                    {log.ip || "-"}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      
      {sortedLogs.some(log => log.clockOut) && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4">
          Time recorded successfully
        </div>
      )}
    </div>
  );
};

export default TimeLogsTable;

