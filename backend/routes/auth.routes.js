const express = require('express');
const AuthController = require('../controllers/authController');
const { verifyToken, isWorker } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register/worker', AuthController.registerWorker);
router.post('/register/customer', AuthController.registerCustomer);
router.post('/login', AuthController.login);
router.post('/refresh-token', AuthController.refreshToken);

// Protected routes
router.post('/setup-till', verifyToken, isWorker, AuthController.setupTillCredentials);
router.get('/me', verifyToken, AuthController.getCurrentUser);

module.exports = router;
