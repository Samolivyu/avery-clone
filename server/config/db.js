// server/config/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const clientOptions = {
  serverApi: {
    version: '1', 
    strict: true,
    deprecationErrors: true,
  },
  connectTimeoutMS: 100000, 
  serverSelectionTimeoutMS: 5000,
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, clientOptions);
    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('URI used:', process.env.MONGODB_URI);
    // process.exit(1); 
  }
};

const closeDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('📴 MongoDB connection closed.');
  } catch (error) {
    console.error(`❌ Error closing MongoDB connection: ${error.message}`);
  }
};

export default {connectDB, closeDB};