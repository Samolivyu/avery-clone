// server/models/user.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  pin: { type: String, required: true },
  firstName: String,
  lastName: String,
  role: { type: String, enum: ['staff', 'admin'], default: 'staff' },
  employeeId: { type: String, unique: true },
  isActive: { type: Boolean, default: true },
  lastLogin: Date
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  if (this.isModified('pin')) {
    this.pin = await bcrypt.hash(this.pin, 4);
  }
  next();
});

const User = mongoose.model('User', userSchema);

export default User;