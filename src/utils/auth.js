import axios from 'axios';
import jwtDecode from 'jwt-decode';

const API_URL = import.meta.env.VITE_API_URL || '/api'; // Changed to relative path

class AuthManager {
  constructor() {
    this.user = null;
    this.token = null;
    this.refreshToken = null;
    this.refreshPromise = null;
  }

  async initialize() {
    try {
      const token = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');
      const userData = localStorage.getItem('user_data');

      if (token && userData) {
        if (this.isTokenExpired(token)) {
          this.refreshToken = refreshToken;
          const newToken = await this.refreshAccessToken();
          if (!newToken) {
            this.clearAuth();
            return false;
          }
          this.token = newToken;
          this.user = JSON.parse(userData);
          return true;
        }

        this.token = token;
        this.refreshToken = refreshToken;
        this.user = JSON.parse(userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Auth initialization error:', error);
      this.clearAuth();
      return false;
    }
  }

  storeAuthData(accessToken, user, refreshToken = null) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('user_data', JSON.stringify(user));
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
      this.refreshToken = refreshToken;
    }
    this.token = accessToken;
    this.user = user;
  }

  clearAuth() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
    this.token = null;
    this.user = null;
    this.refreshToken = null;
    this.refreshPromise = null;
  }

  isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return true;
    }
  }

  async register(userData) {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, userData, {
        headers: { 'Content-Type': 'application/json' }
      });
      return {
        success: true,
        message: res.data.message
      };
    } catch (err) {
      console.error('Registration error:', err);
      return {
        success: false,
        error:
          err.response?.data?.error?.message ||
          'Registration failed. Server may be down.'
      };
    }
  }

  async login(email, password) {
    try {
      const res = await axios.post(
        `${API_URL}/auth/login`,
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      this.storeAuthData(
        res.data.accessToken,
        res.data.user,
        res.data.refreshToken
      );
      return { success: true, user: this.user };
    } catch (err) {
      console.error('Login error:', err.response?.data);
      return {
        success: false,
        error:
          err.response?.data?.error?.message ||
          err.response?.data?.error ||
          'Login failed'
      };
    }
  }

  async loginWithPin(pin) {
    try {
      const res = await axios.post(
        `${API_URL}/auth/pin`,
        { pin },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      this.storeAuthData(
        res.data.accessToken,
        res.data.user,
        res.data.refreshToken
      );
      return { success: true, user: this.user };
    } catch (err) {
      console.error('PIN login error:', err.response?.data);
      return {
        success: false,
        error:
          err.response?.data?.error?.message ||
          err.response?.data?.error ||
          'PIN login failed'
      };
    }
  }

  async logout() {
    try {
      if (this.refreshToken) {
        await axios.post(`${API_URL}/auth/logout`, {
          refreshToken: this.refreshToken
        });
      }
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      this.clearAuth();
    }
  }

  async refreshAccessToken() {
    if (!this.refreshToken) return null;
    if (this.refreshPromise) return this.refreshPromise;

    this.refreshPromise = axios
      .post(`${API_URL}/auth/refresh`, {
        refreshToken: this.refreshToken
      })
      .then(res => {
        this.storeAuthData(res.data.accessToken, this.user, res.data.refreshToken);
        this.refreshPromise = null;
        return res.data.accessToken;
      })
      .catch(err => {
        console.error('Token refresh failed:', err);
        this.clearAuth();
        this.refreshPromise = null;
        return null;
      });

    return this.refreshPromise;
  }

  async authenticatedRequest(config) {
    let token = this.token;

    if (!token || this.isTokenExpired(token)) {
      token = await this.refreshAccessToken();
      if (!token) throw new Error('Session expired');
    }

    try {
      return await axios({
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`
        }
      });
    } catch (err) {
      if (err.response?.status === 401) this.clearAuth();
      throw err;
    }
  }
}

export const authManager = new AuthManager();