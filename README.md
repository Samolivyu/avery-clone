# Avery Website Staff Logger Demo.

## Overview

This project is a clone of the [Original Avery Website](https://www.aealimited.com/), implemented using React, CSS, and HTML. The application incorporates JSON Web Tokens (JWT) for user authentication with a MongoDB backend for persistent data storage.

## Features

- **Avery Website Replica:** This project is inspired by the features and design of the original Avery website.

- **JWT Authentication:** Secure user authentication system with login, signup, and PIN-based authentication.

- **MongoDB Integration:** Persistent data storage using MongoDB for user accounts and application data.

- **Protected Routes:** Route protection ensuring only authenticated users can access certain areas.

## Technologies Used

### Frontend
- **React:** UI component library for building interactive interfaces
- **CSS:** Custom styling to match the original Avery website design
- **HTML:** Application structure and semantic markup
- **Tailwind CSS:** Utility-first CSS framework for rapid styling

### Backend
- **Node.js:** JavaScript runtime for server-side development
- **Express.js:** Web application framework for Node.js
- **MongoDB:** NoSQL database for data persistence
- **JWT:** JSON Web Tokens for secure authentication and authorization

## Project Structure

```
avery-website-clone/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── PinLogin.jsx
│   │   │   └── Signup.jsx
│   │   └── ...
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
└── README.md
```

## Backend Setup & Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn** package manager

### Required Backend Dependencies

Install these core dependencies in your server directory:

```bash
# Navigate to server directory
cd server

# Core dependencies
npm install express mongoose dotenv cors
npm install jsonwebtoken bcryptjs
npm install express-rate-limit helmet morgan

# Development dependencies
npm install --save-dev nodemon concurrently
```

### Third-Party Services Setup

1. **MongoDB Atlas (Recommended):**
   - Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create new cluster
   - Get connection string
   - Add to environment variables

2. **Environment Variables (.env file):**
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/avery-clone
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=7d
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   ```

### Backend Architecture

#### Database Schema (MongoDB Collections)

**Users Collection:**
```javascript
// User document structure
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  pin: String (hashed, optional),
  firstName: String,
  lastName: String,
  createdAt: Date,
  updatedAt: Date,
  isActive: Boolean
}
```

#### API Endpoints Structure

```
POST /api/auth/signup     # User registration
POST /api/auth/login      # Email/password login
POST /api/auth/pin  # PIN-based authentication
GET  /api/auth/verify     # Token verification
POST /api/auth/refresh    # Token refresh
POST /api/auth/logout     # User logout
GET  /api/user/profile    # Protected: Get user profile
PUT  /api/user/profile    # Protected: Update user profile
```

### Minimal Backend Pseudocode

#### Server Setup (server.js)
```javascript
// 1. Import dependencies
// express, mongoose, cors, helmet, dotenv

// 2. Initialize Express app
// app = express()

// 3. Middleware setup
// - CORS configuration
// - JSON parsing
// - Security headers (helmet)
// - Rate limiting

// 4. Database connection
// mongoose.connect(MONGODB_URI)

// 5. Route mounting
// app.use('/api/auth', authRoutes)
// app.use('/api/user', userRoutes)

// 6. Error handling middleware

// 7. Start server
// app.listen(PORT)
```

#### Authentication Routes (routes/auth.js)
```javascript
// POST /api/auth/signup
// 1. Validate input data
// 2. Check if user already exists
// 3. Hash password with bcrypt
// 4. Create new user in MongoDB
// 5. Generate JWT token
// 6. Return token + user data

// POST /api/auth/login
// 1. Validate email/password input
// 2. Find user in database
// 3. Compare password with bcrypt
// 4. Generate JWT token
// 5. Return token + user data

// POST /api/auth/pin
// 1. Validate PIN input
// 2. Find user by PIN (hashed)
// 3. Verify PIN with bcrypt
// 4. Generate JWT token
// 5. Return token + user data
```

#### JWT Middleware (middleware/auth.js)
```javascript
// Authentication middleware
// 1. Extract token from Authorization header
// 2. Verify token with JWT secret
// 3. Decode user information
// 4. Attach user to request object
// 5. Call next() or return error
```

### Frontend Integration Points

#### Authentication Service (client/src/services/auth.js)
```javascript
// API call functions
// - signup(userData)
// - login(credentials)
// - pinLogin(pin)
// - logout()
// - getCurrentUser()
// - refreshToken()

// Token management
// - setToken(token)
// - getToken()
// - removeToken()
// - isAuthenticated()
```

#### Component Integration Flow

**Signup.jsx:**
```javascript
// 1. Form submission handler
// 2. Call auth.signup(formData)
// 3. Store returned JWT token
// 4. Redirect to dashboard/home
// 5. Handle errors (display messages)
```

**Login.jsx:**
```javascript
// 1. Email/password form handler
// 2. Call auth.login(credentials)
// 3. Store JWT token
// 4. Redirect authenticated user
// 5. Error handling
```

**PinLogin.jsx:**
```javascript
// 1. PIN input handler
// 2. Call auth.pinLogin(pin)
// 3. Store JWT token
// 4. Redirect to authenticated area
// 5. Error handling
```

## Installation & Development

### Frontend Setup
```bash
# Clone repository
git clone https://github.com/Samolivyu/avery-website-clone.git
cd avery-website-clone

# Install frontend dependencies
cd client
npm install

# Install additional frontend packages for JWT
npm install axios react-router-dom
```

### Backend Setup
```bash
# Setup backend
cd ../server
npm install

# Create environment file
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

### Development Workflow
```bash
# Terminal 1: Start backend server
cd server
npm run dev  # Uses nodemon for auto-restart

# Terminal 2: Start frontend
cd client
npm start    # Runs on http://localhost:3000

# Backend runs on http://localhost:5000
```

### Production Deployment

1. **Environment Setup:** Configure production environment variables
2. **Database:** Ensure MongoDB Atlas is properly configured
3. **Build Frontend:** `npm run build` in client directory
4. **Deploy Backend:** Use services like Heroku, Vercel, or DigitalOcean
5. **CORS Configuration:** Update CORS settings for production URLs

## Security Considerations

- **Password Hashing:** All passwords stored using bcrypt
- **JWT Security:** Tokens include expiration and are signed with secret key
- **Rate Limiting:** API endpoints protected against brute force attacks
- **Input Validation:** All user inputs validated and sanitized
- **HTTPS:** Use HTTPS in production
- **Environment Variables:** Sensitive data stored in environment variables


## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [Original Avery Website](https://www.aealimited.com/): Inspiration for this project's design and functionality
- [MongoDB Atlas](https://www.mongodb.com/atlas): Cloud database service
- [JWT.io](https://jwt.io/): JSON Web Token resources and documentation