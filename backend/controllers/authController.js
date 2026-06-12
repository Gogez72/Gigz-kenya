const AuthService = require('../services/authService');
const User = require('../models/User');

class AuthController {
  // Worker Registration
  static async registerWorker(req, res, next) {
    try {
      const { email, password, phoneNumber, firstName, lastName } = req.body;

      // Validate input
      if (!email || !password || !phoneNumber || !firstName || !lastName) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Register user
      const user = await AuthService.register(
        email,
        password,
        phoneNumber,
        firstName,
        lastName,
        'worker'
      );

      // Generate tokens
      const token = AuthService.generateToken(user.id, 'worker');
      const refreshToken = AuthService.generateRefreshToken(user.id, 'worker');

      res.status(201).json({
        message: 'Worker registered successfully',
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
      });
    } catch (error) {
      next(error);
    }
  }

  // Customer Registration
  static async registerCustomer(req, res, next) {
    try {
      const { email, password, phoneNumber, firstName, lastName } = req.body;

      // Validate input
      if (!email || !password || !phoneNumber || !firstName || !lastName) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Register user
      const user = await AuthService.register(
        email,
        password,
        phoneNumber,
        firstName,
        lastName,
        'customer'
      );

      // Generate tokens
      const token = AuthService.generateToken(user.id, 'customer');
      const refreshToken = AuthService.generateRefreshToken(user.id, 'customer');

      res.status(201).json({
        message: 'Customer registered successfully',
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
      });
    } catch (error) {
      next(error);
    }
  }

  // Login
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      // Login
      const result = await AuthService.login(email, password);

      res.status(200).json({
        message: 'Login successful',
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  // Refresh Token
  static async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token is required' });
      }

      const newToken = AuthService.refreshToken(refreshToken);

      res.status(200).json({
        message: 'Token refreshed successfully',
        token: newToken,
      });
    } catch (error) {
      next(error);
    }
  }

  // Setup Till Credentials
  static async setupTillCredentials(req, res, next) {
    try {
      const { till_number, merchant_id, phone_number } = req.body;
      const workerId = req.user.userId;

      // Validate input
      if (!till_number || !merchant_id || !phone_number) {
        return res.status(400).json({ error: 'Till number, merchant ID, and phone number are required' });
      }

      // Setup till credentials
      const till = await AuthService.setupTillCredentials(
        workerId,
        till_number,
        merchant_id,
        phone_number
      );

      res.status(200).json({
        message: 'Till credentials setup successfully',
        till: {
          id: till.id,
          workerId: till.worker_id,
          tillNumber: till.till_number,
          merchantId: till.merchant_id,
          phoneNumber: till.phone_number,
          isActive: till.is_active,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // Get Current User
  static async getCurrentUser(req, res, next) {
    try {
      const userId = req.user.userId;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({
        message: 'User retrieved successfully',
        user: {
          id: user.id,
          email: user.email,
          phoneNumber: user.phone_number,
          firstName: user.first_name,
          lastName: user.last_name,
          userType: user.user_type,
          isVerified: user.is_verified,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
