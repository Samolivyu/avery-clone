String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export const mockAuth = 
{
  /**
   * Simulates user login
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<{ success: boolean, user?: object, error?: string }>}
   */
  login: async (email, password) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Validation
    if (!email.includes('@')) {
      return { success: false, error: 'Invalid email format.' };
    }
    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    };

    // Simulate successful login
    const token = 'mock-jwt-token-' + Date.now();
    localStorage.setItem('authToken', token);
    
    // Create a mock user object
    const user = {
      email,
      firstName: email.split('@')[0].capitalize(), // Helper to capitalize first letter
      lastName: 'User',
      role: 'employee',
      userId: '12345'
    };

    return { success: true, user };
  },

  /**
   * Simulates user registration
   * @param {object} data - Contains firstName, lastName, email, password, confirmPassword, etc.
   * @returns {Promise<{ success: boolean, error?: string }>}
   */
  register: async (data) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Validation
    if (!data.email || !data.email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (data.password !== data.confirmPassword) {
      return { success: false, error: 'Passwords do not match.' };
    }
    if (data.password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    // Simulate successful registration
    // In a real app, you would send this to the backend.
    // Here we just store it in localStorage to simulate persistence if needed.
    localStorage.setItem('registeredUser', JSON.stringify(data));
    
    return { success: true };
  },

  /**
   * Simulates PIN login
   * @param {string} pin 
   * @returns {Promise<{ success: boolean, user?: object, error?: string }>}
   */
  loginWithPin: async (pin) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Validation
    if (!pin || pin.length < 4) {
      return { success: false, error: 'PIN must be at least 4 digits.' };
    }

    // Simulate successful login
    const token = 'mock-pin-token-' + Date.now();
    localStorage.setItem('authToken', token);

    const user = {
      firstName: 'Pin',
      lastName: 'User',
      email: 'pin@user.com',
      role: 'employee',
      userId: '67890'
    };

    return { success: true, user };
  },

  /**
   * Clears authentication data
   */
  logout: async () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('registeredUser');
    return { success: true };
  },

  /**
   * Checks if user is currently authenticated
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  /**
   * Gets current user data from storage or mock
   * @returns {object|null}
   */
  getCurrentUser: () => {
    const token = localStorage.getItem('authToken');
    if (!token) return null;

    // If logged in, return the user data
    const userData = localStorage.getItem('registeredUser');
    if (userData) {
      return JSON.parse(userData);
    }

    return null;
  }
};
