import React, { useState, useEffect, Fragment } from 'react';
import { authManager } from '../../utils/auth';
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
        // Fixed method name
        const response = await authManager.getUserLogs(userId);
        let fetchedLogs = response.logs || [];

        if (showTodayOnly) {
          const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
          fetchedLogs = fetchedLogs.filter(log =>
            log.clockIn.startsWith(today)
          );
        }

        setLogs(fetchedLogs);
      } catch (err) {
        const msg = 'Failed to fetch time logs.';
        setError(msg);
        toast.error(msg);
        console.error('Error fetching time logs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [userId, showTodayOnly, refreshKey]);

  // Sort logs by clock-in time, most recent first
  const sortedLogs = [...logs].sort(
    (a, b) => new Date(b.clockIn) - new Date(a.clockIn)
  );

  const formatDate = dateStr => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  if (loading) {
    return (
      <p className="text-gray-500 text-center my-4">
        Loading time logs...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 text-center my-4">
        {error}
      </p>
    );
  }

  if (sortedLogs.length === 0) {
    const emptyMsg = showTodayOnly
      ? 'No time logs found for today.'
      : 'No time logs found.';
    return (
      <p className="text-gray-500 text-center my-4">
        {emptyMsg}
      </p>
    );
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
            <Fragment key={log._id}>
              {/* Clock In row */}
              <tr className="hover:bg-gray-50">
                <td className="py-2 px-4 text-sm text-gray-900 border-b">
                  Clock In
                </td>
                <td className="py-2 px-4 text-sm text-gray-900 border-b">
                  {formatDate(log.clockIn)}
                </td>
                <td className="py-2 px-4 text-sm text-gray-900 border-b">
                  {log.ip || '-'}
                </td>
              </tr>

              {/* Clock Out row (if clocked out) */}
              {log.clockOut && (
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="py-2 px-4 text-sm text-gray-900">
                    Clock Out
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-900">
                    {formatDate(log.clockOut)}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-900">
                    {log.ip || '-'}
                  </td>
                </tr>
              )}
            </Fragment>
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