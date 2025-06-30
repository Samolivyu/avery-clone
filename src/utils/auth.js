import axios from 'axios';
import jwtDecode from 'jwt-decode';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class AuthManager {
  constructor() {
    this.user = null;
    this.token = null;
    this.refreshPromise = null; // Track ongoing refresh requests
  }

  initialize() {
    try {
      const storedToken = localStorage.getItem('access_token');
      const storedUserData = localStorage.getItem('user_data');

      if (storedToken && storedUserData) {
        const decodedUser = JSON.parse(storedUserData);
        if (this.isTokenExpired(storedToken)) {
          console.log('Access token expired');
          this.clearAuth();
          return false;
        }

        this.token = storedToken;
        this.user = decodedUser;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Auth initialization error:', error);
      this.clearAuth();
      return false;
    }
  }

  /**
   * Store access token and optionally user data.
   * If accessToken is provided, persist and update this.token.
   * If user is provided, persist and update this.user.
   */
  storeAuthData(accessToken, user = null) {
    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
      this.token = accessToken;
    }
    if (user) {
      localStorage.setItem('user_data', JSON.stringify(user));
      this.user = user;
    }
  }

  clearAuth() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
    this.token = null;
    this.user = null;
    this.refreshPromise = null; // Clear any pending refresh
  }

  isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (error) {
      return true;
    }
  }

  /**
   * Refresh the JWT access token using the /auth/refresh endpoint.
   * Ensures only one refresh request is in-flight at a time.
   */
  async refreshToken() {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }
    try {
      this.refreshPromise = axios.post(
        `${API_URL}/auth/refresh`,
        {},
        { headers: { Authorization: `Bearer ${this.token}` } }
      );
      const response = await this.refreshPromise;
      const newToken = response.data.token;
      this.storeAuthData(newToken);
      return newToken;
    } catch (error) {
      this.clearAuth();
      throw new Error('Session expired. Please log in again.');
    } finally {
      this.refreshPromise = null;
    }
  }

  /**
   * Unified helper for authenticated API calls.
   * Automatically refreshes expired tokens and retries once on 401.
   */
  async authenticatedRequest(method, endpoint, data = null) {
    if (!this.token) {
      throw new Error('Authentication required');
    }

    // Attempt to refresh token if expired
    if (this.isTokenExpired(this.token)) {
      await this.refreshToken();
    }

    try {
      const response = await axios({
        method,
        url: `${API_URL}${endpoint}`,
        headers: { Authorization: `Bearer ${this.token}` },
        data
      });
      return response.data;
    } catch (error) {
      // If unauthorized, try one refresh + retry
      if (error.response?.status === 401) {
        try {
          await this.refreshToken();
          const retryRes = await axios({
            method,
            url: `${API_URL}${endpoint}`,
            headers: { Authorization: `Bearer ${this.token}` },
            data
          });
          return retryRes.data;
        } catch (retryError) {
          this.clearAuth();
          throw new Error('Session expired. Please log in again.');
        }
      }
      throw error;
    }
  }

  // Authentication endpoints
  async login(email, password) {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token, user } = response.data;
      this.storeAuthData(token, user);
      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Invalid credentials'
      };
    }
  }

  async loginWithPin(pin) {
    try {
      const response = await axios.post(`${API_URL}/auth/pin-login`, { pin });
      const { token, user } = response.data;
      this.storeAuthData(token, user);
      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Invalid PIN'
      };
    }
  }

  async logout() {
    try {
      await axios.post(
        `${API_URL}/auth/logout`,
        {},
        { headers: { Authorization: `Bearer ${this.token}` } }
      );
    } finally {
      this.clearAuth();
    }
  }

  // Time tracking endpoints
  async clockIn(notes = '') {
    return this.authenticatedRequest('post', '/time/clock-in', { notes });
  }

  async clockOut(notes = '') {
    return this.authenticatedRequest('post', '/time/clock-out', { notes });
  }

  async startBreak(notes = '') {
    return this.authenticatedRequest('post', '/time/start-break', { notes });
  }

  async endBreak(notes = '') {
    return this.authenticatedRequest('post', '/time/end-break', { notes });
  }

  async getActiveLog() {
    return this.authenticatedRequest('get', '/time/active-log');
  }

  async getActiveBreak() {
    return this.authenticatedRequest('get', '/time/active-break');
  }

  async getTodaysLogs() {
    return this.authenticatedRequest('get', '/time/today-logs');
  }

  // Getters
  getAccessToken() {
    return this.token;
  }

  isAuthenticated() {
    return !!this.token && !this.isTokenExpired(this.token);
  }

  getCurrentUser() {
    return this.user ? { ...this.user } : null;
  }
}

export const authManager = new AuthManager();