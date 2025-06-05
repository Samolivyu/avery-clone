
import jwt_decode from "jwt-decode";

// User data structure
const users = [
  { 
    id: "1", 
    email: "admin@avery.com", 
    password: "admin123", 
    pin: "1234",
    name: "Admin User", 
    role: "admin",
    employeeId: "123456"
  },
  { 
    id: "2", 
    email: "staff@avery.com", 
    password: "staff123", 
    pin: "5678",
    name: "Staff User", 
    role: "staff",
    employeeId: "445566"
  }
];

// Constants for local storage keys
const LOCAL_STORAGE_TOKEN_KEY = "avery_auth_token";
const LOCAL_STORAGE_TIME_LOGS_KEY = "avery_time_logs";
const LOCAL_STORAGE_BREAKS_KEY = "avery_break_logs";

// Authentication functions
export const login = (email, password) => {
  // Find user by email and password
  console.log("Attempting login with email:", email, "and password:", password);

  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  
  if (!user) {
    console.log("Login failed. User not found.");
    return null;
  }
  
  // Create a simple JWT-like token
  const token = jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      name: user.name, 
      role: user.role,
      employeeId: user.employeeId
    },
    "secret_key",
    { expiresIn: "2h" }
  );
  
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
  return token;
};

export const loginWithPin = (pin) => {
  const user = users.find(u => u.pin === pin);
  
  if (!user) return null;
  
  // Create a simple JWT-like token
  const token = jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      name: user.name, 
      role: user.role,
      employeeId: user.employeeId
    },
    "secret_key",
    { expiresIn: "8h" }
  );
  
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
  return token;
};

export const logout = () => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
};

export const getToken = () => {
  return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
};

export const getCurrentUser = () => {
  const token = getToken();
  if (!token) return null;
  
  try {
    const decoded = jwt_decode(token);
    return decoded;
  } catch (error) {
    return null;
  }
};

export const isAuthenticated = () => {
  return getToken() !== null;
};

// Time logging functions
export const clockIn = (userId, notes = "") => {
  const existingLogs = getTimeLogs();
  
  // Check if user already has an active session
  const activeLog = existingLogs.find(log => log.userId === userId && log.clockOut === null);
  if (activeLog) {
    throw new Error("You already have an active session. Please clock out first.");
  }
  
  const newLog = {
    id: Date.now().toString(),
    userId,
    clockIn: new Date(),
    clockOut: null,
    duration: null,
    notes,
    ip: "192.168.1." + Math.floor(Math.random() * 255) // Mock IP for demo
  };
  
  const updatedLogs = [...existingLogs, newLog];
  localStorage.setItem(LOCAL_STORAGE_TIME_LOGS_KEY, JSON.stringify(updatedLogs));
  
  return newLog;
};

export const clockOut = (userId, notes = "") => {
  const existingLogs = getTimeLogs();
  
  // Find the active session for this user
  const activeLogIndex = existingLogs.findIndex(log => log.userId === userId && log.clockOut === null);
  
  if (activeLogIndex === -1) {
    throw new Error("No active session found. Please clock in first.");
  }
  
  const clockOutTime = new Date();
  const activeLog = existingLogs[activeLogIndex];
  const clockInTime = new Date(activeLog.clockIn);
  
  // Calculate duration in minutes
  const duration = Math.round((clockOutTime.getTime() - clockInTime.getTime()) / 60000);
  
  const updatedLog = {
    ...activeLog,
    clockOut: clockOutTime,
    duration,
    notes: notes || activeLog.notes
  };
  
  existingLogs[activeLogIndex] = updatedLog;
  localStorage.setItem(LOCAL_STORAGE_TIME_LOGS_KEY, JSON.stringify(existingLogs));
  
  return updatedLog;
};

export const startBreak = (userId, notes = "") => {
  const existingBreaks = getBreakLogs();
  
  // Check if user already has an active break
  const activeBreak = existingBreaks.find(brk => brk.userId === userId && brk.endTime === null);
  if (activeBreak) {
    throw new Error("You already have an active break. Please end your break first.");
  }
  
  const newBreak = {
    id: Date.now().toString(),
    userId,
    startTime: new Date(),
    endTime: null,
    duration: null,
    notes
  };
  
  const updatedBreaks = [...existingBreaks, newBreak];
  localStorage.setItem(LOCAL_STORAGE_BREAKS_KEY, JSON.stringify(updatedBreaks));
  
  return newBreak;
};

export const endBreak = (userId, notes = "") => {
  const existingBreaks = getBreakLogs();
  
  // Find the active break for this user
  const activeBreakIndex = existingBreaks.findIndex(brk => brk.userId === userId && brk.endTime === null);
  
  if (activeBreakIndex === -1) {
    throw new Error("No active break found. Please start a break first.");
  }
  
  const endTime = new Date();
  const activeBreak = existingBreaks[activeBreakIndex];
  const startTime = new Date(activeBreak.startTime);
  
  // Calculate duration in minutes
  const duration = Math.round((endTime.getTime() - startTime.getTime()) / 60000);
  
  const updatedBreak = {
    ...activeBreak,
    endTime,
    duration,
    notes: notes || activeBreak.notes
  };
  
  existingBreaks[activeBreakIndex] = updatedBreak;
  localStorage.setItem(LOCAL_STORAGE_BREAKS_KEY, JSON.stringify(updatedBreaks));
  
  return updatedBreak;
};

export const getTimeLogs = () => {
  const logsJson = localStorage.getItem(LOCAL_STORAGE_TIME_LOGS_KEY);
  return logsJson ? JSON.parse(logsJson) : [];
};

export const getBreakLogs = () => {
  const logsJson = localStorage.getItem(LOCAL_STORAGE_BREAKS_KEY);
  return logsJson ? JSON.parse(logsJson) : [];
};

export const getUserLogs = (userId) => {
  return getTimeLogs().filter(log => log.userId === userId);
};

export const getUserBreaks = (userId) => {
  return getBreakLogs().filter(brk => brk.userId === userId);
};

export const getActiveLog = (userId) => {
  return getTimeLogs().find(log => log.userId === userId && log.clockOut === null) || null;
};

export const getActiveBreak = (userId) => {
  return getBreakLogs().find(brk => brk.userId === userId && brk.endTime === null) || null;
};

export const getTodaysLogs = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return getTimeLogs().filter(log => {
    const logDate = new Date(log.clockIn);
    logDate.setHours(0, 0, 0, 0);
    return logDate.getTime() === today.getTime();
  });
};

export const downloadAllRecords = () => {
  const logs = getTimeLogs();
  const breaks = getBreakLogs();
  
  const data = {
    timeLogs: logs,
    breakLogs: breaks,
    exportedAt: new Date().toISOString()
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `avery_time_records_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Mock jwt sign function
const jwt = {
  sign: (payload, secret, options) => {
    const header = { alg: "HS256", typ: "JWT" };
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify({
      ...payload,
      exp: Date.now() + (options.expiresIn === "2h" ? 7200000 : 28800000)
    }));
    
    // In a real implementation, the signature would be a proper HMAC
    const signature = btoa("mock_signature_for_demo_purposes_only");
    
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }
};