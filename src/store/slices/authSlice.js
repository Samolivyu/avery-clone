// src/store/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Action for successful login
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    // Action for logout
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    // Action to set an error
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // Action to clear errors
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoading, loginSuccess, logout, setError, clearError } = authSlice.actions;
export default authSlice.reducer;
