import mongoose from 'mongoose';

const TimesheetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  clockIn: {
    type: Date,
    required: true,
    default: Date.now
  },
  clockOut: {
    type: Date
  },
  notes: {
    type: String
  },
  ip: {
    type: String
  },
  // Optional fields for managing breaks within a timesheet entry
  breakStart: {
    type: Date,
    default: null, // Set to Date.now when break starts
  },
  breakEnd: {
    type: Date,
    default: null, // Set to Date.now when break ends
  },
  // You might also want to track cumulative break duration if breaks can be multiple or paused
  // totalBreakDurationMinutes: {
  //   type: Number,
  //   default: 0,
  // }
}, {
  timestamps: true // Adds createdAt/updatedAt fields
});

// Create indexes for optimized queries
TimesheetSchema.index({ userId: 1, clockOut: 1 }); // For active session lookups
TimesheetSchema.index({ userId: 1, clockIn: -1 }); // For recent logs

const Timesheet = mongoose.model('Timesheet', TimesheetSchema);

export default Timesheet;
