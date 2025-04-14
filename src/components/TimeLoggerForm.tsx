
import React, { useState } from 'react';
import { clockIn, clockOut, getActiveLog, User } from '../utils/auth';
import { toast } from 'sonner';

interface TimeLoggerFormProps {
  user: User;
  onRefresh: () => void;
}

const TimeLoggerForm = ({ user, onRefresh }: TimeLoggerFormProps) => {
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const activeLog = getActiveLog(user.id);
  const isClockingIn = !activeLog;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isClockingIn) {
        clockIn(user.id, notes);
        toast.success("Clocked in successfully");
      } else {
        clockOut(user.id, notes);
        toast.success("Clocked out successfully");
      }
      
      setNotes("");
      onRefresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An error occurred");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-4">
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
          Notes (optional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-weightech-red"
          rows={3}
        />
      </div>
      
      <button
        type="submit"
        className={`w-full py-2 text-white rounded-md focus:outline-none ${
          isClockingIn 
            ? "bg-green-600 hover:bg-green-700" 
            : "bg-red-600 hover:bg-red-700"
        }`}
        disabled={isLoading}
      >
        {isLoading 
          ? "Processing..." 
          : isClockingIn 
            ? "Clock In" 
            : "Clock Out"
        }
      </button>
    </form>
  );
};

export default TimeLoggerForm;
