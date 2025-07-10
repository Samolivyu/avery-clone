// src/store/slices/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: false,
  modals: {}, // e.g., { timeLoggerModal: { isOpen: false, data: null } }
  theme: 'light', // 'light' or 'dark'
  activeTab: 'dashboard', // Controls which main tab is active
  globalLoading: false, // For global app-wide loading indicators
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    openModal: (state, action) => {
      // payload: { name: 'modalName', data: { ... } }
      state.modals[action.payload.name] = { isOpen: true, data: action.payload.data || null };
    },
    closeModal: (state, action) => {
      // payload: 'modalName'
      if (state.modals[action.payload]) {
        state.modals[action.payload].isOpen = false;
        state.modals[action.payload].data = null;
      }
    },
    setTheme: (state, action) => {
      state.theme = action.payload; // 'light' or 'dark'
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  openModal,
  closeModal,
  setTheme,
  setActiveTab,
  setGlobalLoading,
} = uiSlice.actions;

export default uiSlice.reducer;
