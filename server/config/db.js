import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB connection with auto-retry
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30 seconds
      heartbeatFrequencyMS: 10000, // 10 seconds
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Initialize collections and indexes
    await initializeDatabase();
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    // Retry connection after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

// Initialize database collections and indexes
const initializeDatabase = async () => {
  try {
    const db = mongoose.connection.db;
    
    // Create collections if they don't exist
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);
    
    const requiredCollections = ['users', 'timesheets', 'sessions'];
    
    for (const collectionName of requiredCollections) {
      if (!collectionNames.includes(collectionName)) {
        await db.createCollection(collectionName);
        console.log(`📁 Created collection: ${collectionName}`);
      }
    }
    
    // Create indexes for better performance
    await createIndexes();
    
  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
  }
};

// Create all necessary indexes
const createIndexes = async () => {
  try {
    const db = mongoose.connection.db;
    
    // Users collection indexes
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('users').createIndex({ employeeId: 1 }, { unique: true, sparse: true });
    await db.collection('users').createIndex({ createdAt: 1 });
    
    // Timesheets collection indexes
    await db.collection('timesheets').createIndex({ userId: 1, date: -1 });
    await db.collection('timesheets').createIndex({ userId: 1, clockIn: -1 });
    await db.collection('timesheets').createIndex({ createdAt: -1 });
    
    // Sessions collection indexes (for active login sessions)
    await db.collection('sessions').createIndex({ userId: 1 });
    await db.collection('sessions').createIndex({ token: 1 }, { unique: true });
    await db.collection('sessions').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
    
    console.log('📊 Database indexes created successfully');
    
  } catch (error) {
    console.error('❌ Index creation error:', error.message);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('📴 MongoDB connection closed through app termination');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error closing MongoDB connection:', error.message);
    process.exit(1);
  }
});

export default connectDB;