const { pool } = require('../config/database');

class User {
  // Create a new user
  static async create(email, passwordHash, phoneNumber, firstName, lastName, userType) {
    const query = `
      INSERT INTO users (email, password_hash, phone_number, first_name, last_name, user_type, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
      RETURNING id, email, phone_number, first_name, last_name, user_type, created_at;
    `;
    const result = await pool.query(query, [email, passwordHash, phoneNumber, firstName, lastName, userType]);
    return result.rows[0];
  }

  // Find user by email
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1;';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  // Find user by ID
  static async findById(id) {
    const query = 'SELECT id, email, phone_number, first_name, last_name, user_type, created_at FROM users WHERE id = $1;';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  // Find user by phone number
  static async findByPhone(phoneNumber) {
    const query = 'SELECT * FROM users WHERE phone_number = $1;';
    const result = await pool.query(query, [phoneNumber]);
    return result.rows[0];
  }

  // Update user verification status
  static async updateVerificationStatus(id, isVerified) {
    const query = `
      UPDATE users
      SET is_verified = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING id, email, is_verified;
    `;
    const result = await pool.query(query, [isVerified, id]);
    return result.rows[0];
  }

  // Update user profile
  static async updateProfile(id, firstName, lastName, phoneNumber) {
    const query = `
      UPDATE users
      SET first_name = $1, last_name = $2, phone_number = $3, updated_at = NOW()
      WHERE id = $4
      RETURNING id, email, first_name, last_name, phone_number, user_type;
    `;
    const result = await pool.query(query, [firstName, lastName, phoneNumber, id]);
    return result.rows[0];
  }

  // Get user with full details
  static async getFullProfile(id) {
    const query = `
      SELECT u.*, wp.bio, wp.profile_picture_url, wp.skills, wp.rating, wp.total_gigs_completed
      FROM users u
      LEFT JOIN worker_profiles wp ON u.id = wp.user_id
      WHERE u.id = $1;
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = User;
