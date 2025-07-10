import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

export const generateToken = (userId) => {
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
      const token = generateToken(userId);
      console.log('Generated Token:', token);

      const decoded = decodeToken(token);
      console.log('Decoded (no verify):', decoded);

      const verified = verifyToken(token);
      console.log('Verified Token Payload:', verified);
    } catch (err) {
      console.error('Self-test failed:', err);
      process.exit(1);
    }
  })();
}