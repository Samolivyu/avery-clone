// src/store/slices/notificationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: null,
  type: 'info', // 'success', 'error', 'warning', 'info'
  id: null, // Unique ID for each toast
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type || 'info';
      state.id = Date.now(); // Simple unique ID for toast
    },
    clearNotification: (state) => {
      state.message = null;
      state.type = 'info';
      state.id = null;
    },
  },
});

export const { showNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
