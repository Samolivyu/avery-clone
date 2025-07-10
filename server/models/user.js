// server/models/user.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
  pin: { // Added PIN field
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

// Pre-save middleware to hash password and PIN before saving
UserSchema.pre('save', async function (next) {
  // Hash password only if it's new or modified
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, parseInt(process.env.BCRYPT_SALT_ROUNDS || 12));
  }
  // Hash PIN only if it's new or modified and not null/empty
  if (this.isModified('pin') && this.pin) {
    this.pin = await bcrypt.hash(this.pin, parseInt(process.env.BCRYPT_SALT_ROUNDS || 12));
  }
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model('User', UserSchema);

export default User;
