import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach decoded user info to req.user for controllers to use
    req.user = {
      _id: decoded.userId, // MongoDB's default ID field
      userId: decoded.userId, // For consistency with frontend's `currentUser.userId`
      email: decoded.email,
      role: decoded.role,
      department: decoded.department,
      name: decoded.name // Ensure name is included in your JWT payload
    };
    next();
  } catch (err) {
    // If token is invalid or expired
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Admin access required' });
  }
};
