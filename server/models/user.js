import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
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
  pin: {
    type: String,
    sparse: true,
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

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, parseInt(process.env.BCRYPT_SALT_ROUNDS || 12));
  }
  if (this.isModified('pin') && this.pin) {
    this.pin = await bcrypt.hash(this.pin, parseInt(process.env.BCRYPT_SALT_ROUNDS || 12));
  }
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model('User', UserSchema);

export default User;