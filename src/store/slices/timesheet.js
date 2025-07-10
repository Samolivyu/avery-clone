// src/store/slices/timesheetSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  timesheets: [],
  currentTimesheet: null, // The active clock-in session
  isTracking: false, // True if currently clocked in
  totalHoursToday: 0, // Calculated total hours for the current day
  loading: false,
  error: null,
};

const timesheetSlice = createSlice({
  name: 'timesheet',
  initialState,
  reducers: {
    setTimesheetLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTimesheetError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearTimesheetError: (state) => {
      state.error = null;
    },
    // Action to set all fetched timesheets
    setTimesheets: (state, action) => {
      state.timesheets = action.payload;
      state.loading = false;
    },
    // Action for starting a timer (clock-in)
    startTimer: (state, action) => {
      state.currentTimesheet = action.payload; // Payload should be the new timesheet entry
      state.isTracking = true;
      state.loading = false;
      state.error = null;
    },
    // Action for stopping a timer (clock-out)
    stopTimer: (state, action) => {
      // Update the specific timesheet entry that was stopped
      const index = state.timesheets.findIndex(ts => ts._id === action.payload._id);
      if (index !== -1) {
        state.timesheets[index] = action.payload; // Update with the clocked-out entry
      } else {
        // If it wasn't in the list (e.g., first clock-out of the day), add it
        state.timesheets.push(action.payload);
      }
      state.currentTimesheet = null;
      state.isTracking = false;
      state.loading = false;
      state.error = null;
    },
    // Action to update an existing timesheet (e.g., adding break times, notes)
    updateTimesheet: (state, action) => {
      const index = state.timesheets.findIndex(ts => ts._id === action.payload._id);
      if (index !== -1) {
        state.timesheets[index] = action.payload;
      }
      if (state.currentTimesheet && state.currentTimesheet._id === action.payload._id) {
        state.currentTimesheet = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    // Action to delete a timesheet (e.g., admin action)
    deleteTimesheet: (state, action) => {
      state.timesheets = state.timesheets.filter(ts => ts._id !== action.payload); // Payload is timesheet ID
      state.loading = false;
    },
    // Action to set the current active timesheet (e.g., on app load)
    setCurrentActiveTimesheet: (state, action) => {
      state.currentTimesheet = action.payload;
      state.isTracking = !!action.payload; // Set isTracking based on if there's an active timesheet
      state.loading = false;
      state.error = null;
    },
    // Action to update total hours (calculation would happen in selector or thunk)
    setTotalHoursToday: (state, action) => {
      state.totalHoursToday = action.payload;
    }
  },
});

export const {
  setTimesheetLoading,
  setTimesheetError,
  clearTimesheetError,
  setTimesheets,
  startTimer,
  stopTimer,
  updateTimesheet,
  deleteTimesheet,
  setCurrentActiveTimesheet,
  setTotalHoursToday,
} = timesheetSlice.actions;

export default timesheetSlice.reducer;
