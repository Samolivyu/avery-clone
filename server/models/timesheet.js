// server/models/timesheet.js
import mongoose from 'mongoose';

const timesheetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clockIn: { type: Date, required: true },
  clockOut: Date,
  breakStart: Date,
  breakEnd: Date,
  notes: String,
  ip: String
}, { timestamps: true });

const Timesheet = mongoose.model('Timesheet', timesheetSchema);

export default Timesheet;