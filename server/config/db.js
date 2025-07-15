import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Remove deprecated options and add authSource
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      authSource: 'admin'  // Add this line for MongoDB Atlas
    });
    console.log(`✅ MongoDB Connected`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Provide more specific authentication error details
    if (error.name === 'MongoServerError' && error.code === 8000) {
      console.error('Authentication failed. Please check:');
      console.error('1. Your username and password in the connection string');
      console.error('2. Special characters in password are URL encoded');
      console.error('3. Database user exists in MongoDB Atlas');
    }
    // process.exit(1);
  }
};

const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('📴 MongoDB connection closed.');
  } catch (error) {
    console.error(`❌ Error closing MongoDB connection: ${error.message}`);
  }
};

export default { closeDB, connectDB };