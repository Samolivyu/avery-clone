// server/config/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME || 'staff_timer_db', // Use DB_NAME from .env
      serverSelectionTimeoutMS: 30000, // Keep trying for 30 seconds
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // No setTimeout for retry here, as process.exit(1) is usually desired for critical failures
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
