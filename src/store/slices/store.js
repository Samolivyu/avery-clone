// src/store/slices/store.js
import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './notification';
import authReducer from './authSlice';
import timesheetReducer from './timesheet';
import userReducer from './user';
import uiReducer from './ui';

export const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    auth: authReducer,
    timesheet: timesheetReducer,
    user: userReducer,
    ui: uiReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
 devTools: process.env.NODE_ENV !== 'production',
});
