// server.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import timeRoutes from './routes/time.js'; 
// Assuming you have this route file for time logging

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? [process.env.PRODUCTION_URL] // Use PRODUCTION_URL from .env in production
    : ['http://localhost:5173', 'http://localhost:3000'], // Vite default, and any other dev origins
  credentials: true
}));

// Rate limiting to prevent brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.MAX_LOGIN_ATTEMPTS || 100), // Max requests per window, using env var
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter); // Apply to all API routes

// Body parsing middleware
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Parse URL-encoded bodies

// Logging middleware
app.use(morgan('dev')); // Log HTTP requests to the console

// Define API routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/time', timeRoutes); // Time logging routes (assuming you have this)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Staff Timer API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 Not Found handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : null // Send error message in dev
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
