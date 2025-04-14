
import jwt_decode from "jwt-decode";

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface TimeLog {
  id: string;
  userId: string;
  clockIn: Date;
  clockOut: Date | null;
  duration: number | null;
  notes: string;
}

// In a real application, these would be stored in a database
const users = [
  { 
    id: "1", 
    email: "admin@weightech.com", 
    password: "admin123", 
    name: "Admin User", 
    role: "admin" 
  },
  { 
    id: "2", 
    email: "staff@weightech.com", 
    password: "staff123", 
    name: "Staff User", 
    role: "staff" 
  }
];

const LOCAL_STORAGE_TOKEN_KEY = "weightech_auth_token";
const LOCAL_STORAGE_TIME_LOGS_KEY = "weightech_time_logs";

// Mock token creation - in production this would be done securely on the server
export const login = (email: string, password: string): string | null => {
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) return null;
  
  // Create a simple JWT-like token (not secure for production)
  const token = jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      name: user.name, 
      role: user.role 
    },
    "secret_key",
    { expiresIn: "2h" }
  );
  
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
  return token;
};

export const logout = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
};

export const getToken = (): string | null => {
  return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
};

export const getCurrentUser = (): User | null => {
  const token = getToken();
  if (!token) return null;
  
  try {
    const decoded: User = jwt_decode(token);
    return decoded;
  } catch (error) {
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return getToken() !== null;
};

// Time logging functions
export const clockIn = (userId: string, notes: string = ""): TimeLog => {
  const existingLogs = getTimeLogs();
  
  // Check if user already has an active session
  const activeLog = existingLogs.find(log => log.userId === userId && log.clockOut === null);
  if (activeLog) {
    throw new Error("You already have an active session. Please clock out first.");
  }
  
  const newLog: TimeLog = {
    id: Date.now().toString(),
    userId,
    clockIn: new Date(),
    clockOut: null,
    duration: null,
    notes
  };
  
  const updatedLogs = [...existingLogs, newLog];
  localStorage.setItem(LOCAL_STORAGE_TIME_LOGS_KEY, JSON.stringify(updatedLogs));
  
  return newLog;
};

export const clockOut = (userId: string, notes: string = ""): TimeLog | null => {
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
  
  const updatedLog: TimeLog = {
    ...activeLog,
    clockOut: clockOutTime,
    duration,
    notes: notes || activeLog.notes
  };
  
  existingLogs[activeLogIndex] = updatedLog;
  localStorage.setItem(LOCAL_STORAGE_TIME_LOGS_KEY, JSON.stringify(existingLogs));
  
  return updatedLog;
};

export const getTimeLogs = (): TimeLog[] => {
  const logsJson = localStorage.getItem(LOCAL_STORAGE_TIME_LOGS_KEY);
  return logsJson ? JSON.parse(logsJson) : [];
};

export const getUserLogs = (userId: string): TimeLog[] => {
  return getTimeLogs().filter(log => log.userId === userId);
};

export const getActiveLog = (userId: string): TimeLog | null => {
  return getTimeLogs().find(log => log.userId === userId && log.clockOut === null) || null;
};

// Mock jwt sign function
const jwt = {
  sign: (payload: any, secret: string, options: any): string => {
    const header = { alg: "HS256", typ: "JWT" };
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify({
      ...payload,
      exp: Date.now() + (options.expiresIn === "2h" ? 7200000 : 0)
    }));
    
    // In a real implementation, the signature would be a proper HMAC
    const signature = btoa("mock_signature_for_demo_purposes_only");
    
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }
};
