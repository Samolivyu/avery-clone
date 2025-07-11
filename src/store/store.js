// src/store/slices/store.js
import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './slices/notification';
import authReducer from './slices/authSlice';
import timesheetReducer from './slices/timesheet';
import userReducer from './slices/user';
import uiReducer from './slices/ui';

export const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    auth: authReducer,
    timesheet: timesheetReducer,
    user: userReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: process.env.NODE_ENV !== 'production',
});
