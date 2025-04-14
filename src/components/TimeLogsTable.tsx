
import React from 'react';
import { TimeLog, getUserLogs } from '../utils/auth';

interface TimeLogsTableProps {
  userId: string;
}

const formatDate = (date: Date | null): string => {
  if (!date) return "-";
  return new Date(date).toLocaleString();
};

const formatDuration = (minutes: number | null): string => {
  if (minutes === null) return "-";
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  return `${hours}h ${mins}m`;
};

const TimeLogsTable = ({ userId }: TimeLogsTableProps) => {
  const logs = getUserLogs(userId);
  
  // Sort logs by clock-in time, most recent first
  const sortedLogs = [...logs].sort((a, b) => {
    return new Date(b.clockIn).getTime() - new Date(a.clockIn).getTime();
  });
  
  if (sortedLogs.length === 0) {
    return <p className="text-gray-500 text-center my-4">No time logs found.</p>;
  }
  
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Clock In
            </th>
            <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Clock Out
            </th>
            <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Duration
            </th>
            <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Notes
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedLogs.map(log => (
            <tr key={log.id}>
              <td className="py-2 px-4 text-sm text-gray-900">
                {formatDate(log.clockIn)}
              </td>
              <td className="py-2 px-4 text-sm text-gray-900">
                {formatDate(log.clockOut)}
              </td>
              <td className="py-2 px-4 text-sm text-gray-900">
                {formatDuration(log.duration)}
              </td>
              <td className="py-2 px-4 text-sm text-gray-900">
                {log.notes || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeLogsTable;
