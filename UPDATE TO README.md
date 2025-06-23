# Staff Timer Application

A modern staff login timer application built with React, Express, MongoDB, and JWT authentication. Staff members can sign up, set a PIN, and use it to clock in/out with time tracking.

## 🚀 Features

- **Email & PIN Authentication**: Secure login system using email and custom PIN
- **Time Tracking**: Clock in/out functionality with break management  
- **Real-time Dashboard**: Monitor active sessions and timesheet data
- **Role-based Access**: Staff, Manager, and Admin roles
- **Responsive Design**: Built with React and Tailwind CSS
- **Secure Backend**: JWT tokens, rate limiting, and data validation

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Shadcn/UI
- **Backend**: Node.js, Express.js, MongoDB with Mongoose
- **Authentication**: JWT, bcryptjs for PIN hashing
- **Database**: MongoDB Atlas with auto-indexing
- **Development**: Concurrently, Nodemon, ESLint

## 📋 Prerequisites

- Node.js (>=16.0.0)
- MongoDB Atlas account
- Git

## ⚙️ Installation & Setup

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd staff-timer-app
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@trialdbbuild1.zmld9fr.mongodb.net/staff_timer_db?retryWrites=true&w=majority
DB_NAME=staff_timer_db

# JWT Configuration  
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# Client Configuration
VITE_API_URL=http://localhost:5000/api

# Security
BCRYPT_SALT_ROUNDS=12
MAX_LOGIN_ATTEMPTS=5
ACCOUNT_LOCK_TIME=30
```

### 3. MongoDB Atlas Setup
1. **Create MongoDB Atlas Account**: Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. **Create Cluster**: Choose free tier M0 cluster
3. **Network Access**: Add `0.0.0.0/0` to allow all IPs (or your specific IP)
4. **Database User**: Create user with read/write permissions
5. **Get Connection String**: Replace `<username>` and `<password>` in your `.env`

### 4. Database Connection & Initialization

#### Connect to MongoDB via Terminal
```bash
# Quick connect using environment variable
npm run db:connect

# Or connect manually
mongosh "mongodb+srv://<username>:<password>@trialdbbuild1.zmld9fr.mongodb.net/staff_timer_db"
```

#### Auto-Initialize Database
The application automatically creates collections and indexes on startup:
- **Collections**: `users`, `timesheets`, `sessions`  
- **Indexes**: Email uniqueness, timesheet queries, session management
- **Validation**: Schema validation and data integrity

#### Manual Database Operations
```javascript
// In MongoDB shell - explore your data
show dbs
use staff_timer_db
show collections

// View users
db.users.find().pretty()

// View timesheets  
db.timesheets.find().pretty()

// Check indexes
db.users.getIndexes()
db.timesheets.getIndexes()
```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
# Start both frontend and backend concurrently
npm start
# or
npm run dev

# Start only frontend (port 5173)
npm run client  

# Start only backend (port 5000)
npm run server
```

### Production Mode
```bash
npm run start:prod
```

## 📊 Database Schema

### Users Collection
```javascript
{
  email: String (unique),
  firstName: String,
  lastName: String, 
  employeeId: String (unique, optional),
  pin: String (hashed),
  role: ['staff', 'admin', 'manager'],
  department: String,
  isActive: Boolean,
  lastLogin: Date,
  loginAttempts: Number,
  lockUntil: Date
}
```

### Timesheets Collection  
```javascript
{
  userId: ObjectId (ref: User),
  date: Date,
  clockIn: Date,
  clockOut: Date,
  breakStart: Date,
  breakEnd: Date,
  totalHours: Number,
  breakDuration: Number,
  netHours: Number,
  status: ['clocked-in', 'on-break', 'clocked-out', 'incomplete'],
  notes: String,
  location: String,
  isEdited: Boolean,
  editedBy: ObjectId (ref: User),
  editReason: String
}
```

## 🔐 API Endpoints

### Authentication Routes
```
POST /api/auth/register     # Register new staff member
POST /api/auth/login        # Login with email & PIN  
POST /api/auth/logout       # Logout user
GET  /api/auth/me           # Get current user profile
PUT  /api/auth/profile      # Update user profile
PUT  /api/auth/change-pin   # Change user PIN
```

### Timesheet Routes
```
POST /api/timesheet/clock-in     # Clock in for work
POST /api/timesheet/clock-out    # Clock out from work
POST /api/timesheet/break-start  # Start break
POST /api/timesheet/break-end    # End break
GET  /api/timesheet/current      # Get current active timesheet
GET  /api/timesheet/history      # Get timesheet history
GET  /api/timesheet/daily/:date  # Get specific day timesheet
PUT  /api/timesheet/:id          # Edit timesheet (admin only)
```

## 🔄 Development Workflow

### Daily Development
1. **Start Development**: `npm start`
2. **Access MongoDB**: `npm run db:connect`
3. **Check Health**: Visit `http://localhost:5000/api/health`
4. **Frontend**: Visit `http://localhost:5173`

### Database Management
```bash
# Connect to MongoDB Atlas
npm run db:connect

# Initialize/Reset database
npm run db:init

# Check database status
curl http://localhost:5000/api/health
```

### Common MongoDB Commands
```javascript
// Switch to your database
use staff_timer_db

// Create a test user
db.users.insertOne({
  email: "test@avery.com",
  firstName: "Test",
  lastName: "User", 
  pin: "1234",
  role: "staff",
  isActive: true
})

// Find all active users
db.users.find({isActive: true})

// Get today's timesheets
db.timesheets.find({
  date: {
    $gte: new Date(new Date().setHours(0,0,0,0)),
    $lt: new Date(new Date().setHours(23,59,59,999))
  }
})

// Check who's currently clocked in
db.timesheets.find({status: {$in: ["clocked-in", "on-break"]}})
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Test connection
mongosh "mongodb+srv://username:password@cluster.mongodb.net/test"

# Check network access in Atlas dashboard
# Ensure 0.0.0.0/0 is in Network Access List

# Verify credentials
# Double-check username/password in connection string
```

### Common Errors & Solutions

**Error**: `MongoServerSelectionError: read ECONNRESET`
- **Solution**: Check Network Access List in Atlas, try different network

**Error**: `Authentication failed`  
- **Solution**: Verify username/password, check database user permissions

**Error**: `Cannot connect to MongoDB`
- **Solution**: Ensure `.env` file exists and has correct MONGODB_URI

**Error**: `Port 5000 already in use`
- **Solution**: Change PORT in `.env` or kill process: `lsof -ti:5000 | xargs kill -9`

## 📁 Project Structure
```
staff-timer-app/
├── src/
│   ├── components/         # React components
│   ├── config/            # Database & app configuration
│   ├── models/            # Mongoose schemas
│   ├── pages/             # React pages
│   └── utils/             # Helper functions
├── server/
│   ├── index.js           # Express server setup
│   ├── routes/            # API routes
│   └── middleware/        # Custom middleware
├── .env                   # Environment variables
├── package.json           # Project dependencies
└── README.md             # This file
```

## 🚀 Deployment

### Environment Setup
1. **Production MongoDB**: Create production cluster in Atlas
2. **Environment Variables**: Update `.env` with production values
3. **Security**: Generate strong JWT_SECRET for production
4. **Network**: Configure proper CORS origins

### Build & Deploy
```bash
# Build frontend
npm run build

# Start production server  
npm run start:prod
```

## 📝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For support, email your-email@avery.com or create an issue in the repository.

---

## 🧠 Quick Reference

### Essential Commands
```bash
npm start              # Start development
npm run db:connect     # Connect to MongoDB
npm run server         # Backend only
npm run client         # Frontend only
```

### MongoDB Quick Access
```bash
# After npm run db:connect
use staff_timer_db
show collections
db.users.find().limit(5)
db.timesheets.find().sort({createdAt: -1}).limit(10)
exit
```