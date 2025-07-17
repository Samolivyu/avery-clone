import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto'; 

export const generateToken = (userId) => {
  return jwt.sign(
    { 
      id: userId,
      iat: Math.floor(Date.now() / 1000),
      nonce: crypto.randomBytes(16).toString('hex') // Add unique random value
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};

// --- Embedded test harness ---
// Load .env from project root
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Only run tests when invoked directly
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  (async () => {
    console.log('Generating tokens. Running self-test...');

    try {
      const userId = '123456';
      
      // Generate multiple tokens to test uniqueness
      const token1 = generateToken(userId);
      const token2 = generateToken(userId);
      
      console.log('Token 1:', token1);
      console.log('Token 2:', token2);
      console.log('Tokens different?', token1 !== token2 ? '✅ YES' : '❌ NO');
    } catch (err) {
      console.error('Self-test failed:', err);
      process.exit(1);
    }
  })();
}