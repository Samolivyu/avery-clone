// src/pages/Login.jsx
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../store/slices/authSlice';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSuccess = (user) => {
    // Update Redux store with the authenticated user
    dispatch(loginSuccess(user));
    // Redirect to a protected route (e.g., dashboard)
    navigate('/dashboard');
  };

  return <LoginForm onLoginSuccess={handleLoginSuccess} />;
};

export default Login;