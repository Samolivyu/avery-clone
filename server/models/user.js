// server/models/user.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Required for hashing PIN

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    default: 'general',
    enum: ['general', 'development', 'qa', 'design', 'management'],
  },
  role: {
    type: String,
    default: 'employee',
    enum: ['admin', 'manager', 'employee'],
  },
  pin: { // Add this field for PIN authentication
    type: String,
    sparse: true, // Allows null values, so not all users need a PIN
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to hash password before saving
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  // Ensure PIN is hashed if it's being set or modified
  if (this.isModified('pin') && this.pin) {
    this.pin = await bcrypt.hash(this.pin, 10);
  }
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model('User', UserSchema);

export default User;
