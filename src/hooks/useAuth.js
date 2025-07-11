import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authManager } from '../utils/auth';
import { loginSuccess, logout } from '../store/slices/authSlice';

export default function useAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const authenticated = await authManager.initialize();
        if (authenticated) {
          dispatch(loginSuccess({ user: authManager.getCurrentUser() }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        dispatch(logout());
      }
    };

    initializeAuth();
  }, [dispatch]);
}