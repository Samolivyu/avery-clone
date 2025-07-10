// src/utils/auth.js - Centralized Authentication Handler
import axios from 'axios';
import jwtDecode from 'jwt-decode'; // FIX: Changed from { jwtDecode } to jwtDecode (default import)

// Determine API URL based on environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'; // Ensure this matches your backend PORT

class AuthManager {
  constructor() {
    this.user = null; // Stores decoded user info
    this.token = null; // Stores access token
    this.refreshToken = null; // Stores refresh token
    this.refreshPromise = null; // To prevent multiple simultaneous refresh requests
  }

  // Initializes auth state from localStorage on app load
  initialize() {
    try {
      const storedToken = localStorage.getItem('access_token');
      const storedRefreshToken = localStorage.getItem('refresh_token');
      const storedUserData = localStorage.getItem('user_data');

      if (storedToken && storedUserData) {
        const decodedUser = JSON.parse(storedUserData);
        // Check if access token is expired
        if (this.isTokenExpired(storedToken)) {
          console.log('Access token expired during initialization. Attempting to refresh.');
          // Attempt to refresh immediately if token is expired
          // If refresh fails, clear auth and return false.
          this.refreshToken = storedRefreshToken; // Set refresh token for refresh attempt
          return this.refreshAccessToken().then(newAccessToken => {
            if (newAccessToken) {
              this.token = newAccessToken;
              this.user = decodedUser; // User data typically doesn't change on refresh
              return true;
            } else {
              this.clearAuth();
              return false;
            }
          }).catch(() => {
            this.clearAuth();
            return false;
          });
        }

        this.token = storedToken;
        this.refreshToken = storedRefreshToken;
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

  // Stores authentication data
  storeAuthData(accessToken, user, refreshToken = null) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('user_data', JSON.stringify(user));
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }
    this.token = accessToken;
    this.user = user;
    this.refreshToken = refreshToken;
  }

  // Clears all authentication data
  clearAuth() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
    this.token = null;
    this.user = null;
    this.refreshToken = null;
  }

  // Checks if JWT token is expired
  isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token); // Use jwtDecode directly
      const currentTime = Date.now() / 1000; // in seconds
      return decoded.exp < currentTime;
    } catch (error) {
      console.error("Error decoding or checking token expiry:", error);
      return true; // Treat as expired if decoding fails
    }
  }

  // --- API Calls ---

  // User registration
  async register(email, password, userData) {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
        name: userData.name,
        department: userData.department,
        role: userData.role,
        pin: userData.pin // Pass PIN if collected during registration
      });
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      return { success: false, error: error.response?.data?.error?.message || 'Registration failed' };
    }
  }

  // User login
  async login(email, password) {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { accessToken, refreshToken, user } = response.data.data;
      this.storeAuthData(accessToken, user, refreshToken);
      return { success: true, user: this.user };
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      this.clearAuth();
      return { success: false, error: error.response?.data?.error?.message || 'Invalid credentials' };
    }
  }

  // Login with PIN
  async loginWithPin(pin) {
    try {
      const response = await axios.post(`${API_URL}/auth/pin-login`, { pin });
      const { accessToken, refreshToken, user } = response.data.data;
      this.storeAuthData(accessToken, user, refreshToken);
      return { success: true, user: this.user };
    } catch (error) {
      console.error('PIN login failed:', error.response?.data || error.message);
      this.clearAuth();
      return { success: false, error: error.response?.data?.error?.message || 'Invalid PIN' };
    }
  }

  // User logout
  async logout() {
    try {
      if (this.refreshToken) {
        await axios.post(`${API_URL}/auth/logout`, { refreshToken: this.refreshToken });
      }
    } catch (error) {
      console.error('Logout failed on server:', error);
    } finally {
      this.clearAuth();
    }
  }

  // Refresh access token
  async refreshAccessToken() {
    if (!this.refreshToken) {
      console.log('No refresh token available. Cannot refresh access token.');
      this.clearAuth();
      return null;
    }

    // If a refresh is already in progress, return that promise
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken: this.refreshToken });
        const { accessToken, refreshToken: newRefreshToken, user } = response.data.data;
        this.storeAuthData(accessToken, user, newRefreshToken);
        this.refreshPromise = null; // Clear the promise
        resolve(accessToken);
      } catch (error) {
        console.error('Failed to refresh token:', error.response?.data || error.message);
        this.clearAuth(); // Clear all auth if refresh fails
        this.refreshPromise = null; // Clear the promise
        reject(error);
      }
    });
    return this.refreshPromise;
  }

  // Authenticated request wrapper
  async authenticatedRequest(method, path, data = null) {
    let currentToken = this.getAccessToken();

    // If no token or token is expired, try to refresh
    if (!currentToken || this.isTokenExpired(currentToken)) {
      try {
        currentToken = await this.refreshAccessToken();
      } catch (error) {
        console.error("Failed to refresh token before authenticated request:", error);
        throw new Error("Authentication required: Session expired.");
      }
    }

    if (!currentToken) {
      throw new Error("Authentication required: No valid token available.");
    }

    try {
      const config = {
        method: method,
        url: `${API_URL}${path}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentToken}`,
        },
        data: data
      };
      const response = await axios(config);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access, token invalid or expired. Clearing auth.");
        this.clearAuth(); // Clear auth if server responds with 401
      }
      throw error;
    }
  }

  // Helper getters
  getAccessToken() {
    return this.token;
  }

  isAuthenticated() {
    return !!this.token && !this.isTokenExpired(this.token);
  }

  getCurrentUser() {
    return this.user ? { ...this.user } : null;
  }

  // --- Time Logging Functions (Using authenticatedRequest) ---
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

  async getUserLogs(userId) {
    return this.authenticatedRequest('get', `/time/logs/${userId}`);
  }

  async getActiveLog(userId) {
    return this.authenticatedRequest('get', `/time/active-log/${userId}`);
  }

  async getActiveBreak(userId) {
    return this.authenticatedRequest('get', `/time/active-break/${userId}`);
  }

  async downloadAllRecords() {
    try {
      const response = await axios({
        method: 'get',
        url: `${API_URL}/admin/download-records`, // Ensure this path is correct
        headers: {
          'Authorization': `Bearer ${this.getAccessToken()}`,
        },
        responseType: 'blob' // Important for file downloads
      });

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'records.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        console.log('Download initiated successfully.');
      } else {
        const errorData = await new Response(response.data).json();
        console.error('Failed to download records:', errorData);
        throw new Error(errorData.message || 'Failed to download records');
      }
    } catch (error) {
      console.error('Error during download:', error);
      throw error;
    }
  }
}

export const authManager = new AuthManager();
