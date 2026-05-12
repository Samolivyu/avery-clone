import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user';
import authReducer from './slices/authSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
});

