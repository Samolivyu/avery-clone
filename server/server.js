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

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB();

// Security middleware
app.use(helmet());

// Improved CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:8080',
      process.env.CLIENT_URL,
      process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_URL : null
    ].filter(Boolean);
    
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

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


// Add this before your routes
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});


// Define API routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/time', timeRoutes); // Time logging routes

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
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

// Add graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await closeDB(); // Assuming you have a closeDB function to close the database connection
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
