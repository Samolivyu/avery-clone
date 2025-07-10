// src/store/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [], // Array of all users (e.g., for admin views)
  currentUserProfile: null, // Detailed profile of the currently logged-in user
  userSettings: {}, // User-specific settings
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUserError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearUserError: (state) => {
      state.error = null;
    },
    // Action to set all users (e.g., for admin dashboard)
    setUsers: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    // Action to set the current user's detailed profile
    setCurrentUserProfile: (state, action) => {
      state.currentUserProfile = action.payload;
      state.loading = false;
    },
    // Action to update a user's data (e.g., admin editing, or user updating their own profile)
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      const index = state.users.findIndex(user => user._id === updatedUser._id);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
      if (state.currentUserProfile && state.currentUserProfile._id === updatedUser._id) {
        state.currentUserProfile = updatedUser;
      }
      state.loading = false;
    },
    // Action to add a new user (e.g., admin creating an account)
    addUser: (state, action) => {
      state.users.push(action.payload);
      state.loading = false;
    },
    // Action to delete a user
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user._id !== action.payload); // Payload is user ID
      state.loading = false;
    },
    // Action to update user settings
    setUserSettings: (state, action) => {
      state.userSettings = { ...state.userSettings, ...action.payload };
    },
  },
});

export const {
  setUserLoading,
  setUserError,
  clearUserError,
  setUsers,
  setCurrentUserProfile,
  updateUser,
  addUser,
  deleteUser,
  setUserSettings,
} = userSlice.actions;

export default userSlice.reducer;
