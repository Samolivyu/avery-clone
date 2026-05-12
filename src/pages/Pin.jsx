// src/pages/Pin.jsx
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../store/slices/authSlice';
import PinEntryForm from '../components/auth/PinEntryForm';

const Pin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSuccess = (user) => {
    dispatch(loginSuccess(user));
    navigate('/dashboard');
  };

  return <PinEntryForm onSuccess={handleSuccess} />;
};

export default Pin;