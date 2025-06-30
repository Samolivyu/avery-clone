import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Ensure req.user._id is populated later by user retrieval middleware
    req.user = { _id: decoded.userId, role: decoded.role, department: decoded.department }; // Mock req.user for now based on token
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const requireAdmin = (req, res, next) => {
  // This would check user role from database
  // For now, we'll assume it's implemented.
  // Example: if (req.user && req.user.role === 'admin') { next(); } else { res.status(403).json({ error: 'Admin access required' }); }
  next();
};
