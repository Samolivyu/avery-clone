import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs'; // Added bcrypt for password hashing
import User from './server/models/user.js';
import Timesheet from './server/models/timesheet.model.js';

// Load environment variables
dotenv.config();

const initializeDatabase = async () => {
  try {
    console.log('🚀 Initializing Staff Timer Database...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    // Create sample admin user
    const adminExists = await User.findOne({ email: 'admin@avery.com' });
    
    if (!adminExists) {
      const adminUser = new User({
        email: 'admin@avery.com',
        firstName: 'Admin',
        lastName: 'User',
        password: bcrypt.hashSync('admin123', 10), // Added hashed password
        pin: bcrypt.hashSync('1234', 10), // Hashed PIN
        employeeId: 'ADMIN001',
        role: 'admin',
        department: 'Management',
        isActive: true
      });
      
      await adminUser.save();
      console.log('👤 Created admin user: admin@avery.com (Password: admin123, PIN: 1234)');
    } else {
      console.log('👤 Admin user already exists');
    }
    
    // Create sample staff user
    const staffExists = await User.findOne({ email: 'staff@avery.com' });
    
    if (!staffExists) {
      const staffUser = new User({
        email: 'staff@avery.com',
        firstName: 'John',
        lastName: 'Doe',
        password: bcrypt.hashSync('staff123', 10), // Added hashed password
        pin: bcrypt.hashSync('5678', 10), // Hashed PIN
        employeeId: 'STAFF001',
        role: 'staff',
        department: 'Operations',
        isActive: true
      });
      
      await staffUser.save();
      console.log('👤 Created staff user: staff@avery.com (Password: staff123, PIN: 5678)');
    } else {
      console.log('👤 Staff user already exists');
    }
    
    // Display database info
    const userCount = await User.countDocuments();
    const timesheetCount = await Timesheet.countDocuments();
    
    console.log('\n📊 Database Statistics:');
    console.log(`   Users: ${userCount}`);
    console.log(`   Timesheets: ${timesheetCount}`);
    
    console.log('\n🏗️ Collections & Indexes:');
    const collections = await mongoose.connection.db.listCollections().toArray();
    for (const collection of collections) {
      const indexes = await mongoose.connection.db.collection(collection.name).indexes();
      console.log(`   ✓ ${collection.name} (${indexes.length} indexes)`);
    }
    
    console.log('\n🎉 Database initialization completed successfully!');
    console.log('\n🔑 Test Credentials:');
    console.log('   Admin: admin@avery.com | Password: admin123 | PIN: 1234');
    console.log('   Staff: staff@avery.com | Password: staff123 | PIN: 5678');
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n📴 Database connection closed');
    process.exit(0);
  }
};

// Run initialization
initializeDatabase();