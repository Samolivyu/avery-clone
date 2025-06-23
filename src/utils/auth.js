// client/src/utils/auth.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  localStorage.setItem('token', response.data.token);
  return response.data.user;
};

export const loginWithPin = async (pin) => {
  const response = await axios.post(`${API_URL}/auth/pin-login`, { pin });
  localStorage.setItem('token', response.data.token);
  return response.data.user;
};

export const clockIn = async (userId, notes) => {
  await axios.post(`${API_URL}/time/clock-in`, { userId, notes });
};

// Similar functions for clockOut, startBreak, endBreak