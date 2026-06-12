const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const WorkerProfile = require('../models/WorkerProfile');
const TillCredential = require('../models/TillCredential');
const { JWT_SECRET, JWT_EXPIRY, REFRESH_TOKEN_EXPIRY } = require('../config/jwt');

class AuthService {
  // Hash password
  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  // Compare password with hash
  static async comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  // Generate JWT token
  static generateToken(userId, userType) {
    return jwt.sign(
      { userId, userType },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRY }
    );
  }

  // Generate refresh token
  static generateRefreshToken(userId, userType) {
    return jwt.sign(
      { userId, userType },
      JWT_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRY }
    );
  }

  // Register new user
  static async register(email, password, phoneNumber, firstName, lastName, userType) {
    // Check if user exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const passwordHash = await this.hashPassword(password);

    // Create user
    const user = await User.create(email, passwordHash, phoneNumber, firstName, lastName, userType);

    // If worker, create worker profile
    if (userType === 'worker') {
      await WorkerProfile.create(user.id);
    }

    return user;
  }

  // Login user
  static async login(email, password) {
    // Find user
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    // Compare password
    const isPasswordValid = await this.comparePassword(password, user.password_hash);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Generate tokens
    const token = this.generateToken(user.id, user.user_type);
    const refreshToken = this.generateRefreshToken(user.id, user.user_type);

    return {
      user: {
        id: user.id,
        email: user.email,
        phoneNumber: user.phone_number,
        firstName: user.first_name,
        lastName: user.last_name,
        userType: user.user_type,
      },
      token,
      refreshToken,
    };
  }

  // Verify token
  static verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  // Refresh token
  static refreshToken(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, JWT_SECRET);
      const newToken = this.generateToken(decoded.userId, decoded.userType);
      return newToken;
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }

  // Setup till credentials for worker
  static async setupTillCredentials(workerId, tillNumber, merchantId, phoneNumber) {
    // Check if till credentials already exist
    const existingTill = await TillCredential.findByWorkerId(workerId);
    if (existingTill) {
      // Update existing
      return TillCredential.update(workerId, tillNumber, merchantId, phoneNumber);
    }
    // Create new
    return TillCredential.create(workerId, tillNumber, merchantId, phoneNumber);
  }
}

module.exports = AuthService;
