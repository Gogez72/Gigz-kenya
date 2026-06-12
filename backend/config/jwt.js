require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_change_in_production';
const JWT_EXPIRY = '7d'; // Token expires in 7 days
const REFRESH_TOKEN_EXPIRY = '30d'; // Refresh token expires in 30 days

module.exports = {
  JWT_SECRET,
  JWT_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
};
