// server/utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign(
    { 
      id: userId,
      iat: Math.floor(Date.now() / 1000) // Issued at
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const decodeToken = (token) => {
  return jwt.decode(token);
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken
};