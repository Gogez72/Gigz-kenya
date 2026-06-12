const AuthService = require('../services/authService');

// Verify JWT token middleware
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header' });
    }

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = AuthService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

// Check if user is a worker
const isWorker = (req, res, next) => {
  if (req.user.userType !== 'worker') {
    return res.status(403).json({ error: 'This action is only available for workers' });
  }
  next();
};

// Check if user is a customer
const isCustomer = (req, res, next) => {
  if (req.user.userType !== 'customer') {
    return res.status(403).json({ error: 'This action is only available for customers' });
  }
  next();
};

module.exports = {
  verifyToken,
  isWorker,
  isCustomer,
};
