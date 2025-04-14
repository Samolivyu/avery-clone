
import React from 'react';
import { getTodaysLogs, getUserLogs } from '../utils/auth';

const TimeLogsTable = ({ userId, showTodayOnly = false }) => {
  const logs = showTodayOnly ? 
    getTodaysLogs().filter(log => log.userId === userId) : 
    getUserLogs(userId);
  
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
  
  const formatDuration = (minutes) => {
    if (minutes === null) return "-";
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    return `${hours}h ${mins}m`;
  };
  
  if (sortedLogs.length === 0) {
    return <p className="text-gray-500 text-center my-4">No time logs found for today.</p>;
  }
  
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
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
              <tr>
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
                <tr>
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
