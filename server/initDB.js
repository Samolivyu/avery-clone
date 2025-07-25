import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)
import User from './models/user.js';

dotenv.config({ path: path.join(__dirname, '../.env') })
const MONGODB_URI = process.env.MONGODB_URI;

export const initializeDatabase = async () => {
  try {
    console.log('🚀 Initializing Staff Timer Database...');

    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const adminExists = await User.findOne({ email: 'admin@avery.com' });
    if (!adminExists) {
      const adminUser = new User({
        firstName: 'Admin',
        lastName: 'User',
        employeeId: 'A001',
        email: 'admin@avery.com',
        password: 'admin123',
        pin: '1234',
        role: 'admin',
        department: 'management',
        isActive: true
      });
      await adminUser.save();
    }

    const staffExists = await User.findOne({ email: 'staff@avery.com' });
    if (!staffExists) {
      const staffUser = new User({
        name: 'John Doe',
        email: 'staff@avery.com',
        password: 'staff123',
        pin: '5678',
        role: 'employee',
        department: 'general',
        isActive: true
      });
      await staffUser.save();
      console.log('👤 Created staff user: staff@avery.com (Password: staff123, PIN: 5678)');
    } else {
      console.log('👤 Staff user already exists');
    }

    console.log('🎉 Database initialization completed successfully!');
    console.log('\n🔑 Test Credentials:');
    console.log('   Admin: admin@avery.com | Password: admin123 | PIN: 1234');
    console.log('   Staff: staff@avery.com | Password: staff123 | PIN: 5678');
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('📴 Database connection closed after init.'); // Added for clarity
  }
};