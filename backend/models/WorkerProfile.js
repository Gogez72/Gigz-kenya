const { pool } = require('../config/database');

class WorkerProfile {
  // Create worker profile
  static async create(userId, bio = '', skills = []) {
    const query = `
      INSERT INTO worker_profiles (user_id, bio, skills, rating, total_gigs_completed, created_at, updated_at)
      VALUES ($1, $2, $3, 0.00, 0, NOW(), NOW())
      RETURNING id, user_id, bio, skills, rating, total_gigs_completed;
    `;
    const result = await pool.query(query, [userId, bio, skills]);
    return result.rows[0];
  }

  // Get worker profile by user ID
  static async findByUserId(userId) {
    const query = 'SELECT * FROM worker_profiles WHERE user_id = $1;';
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  }

  // Update worker profile
  static async update(userId, bio, skills, profilePictureUrl) {
    const query = `
      UPDATE worker_profiles
      SET bio = $1, skills = $2, profile_picture_url = $3, updated_at = NOW()
      WHERE user_id = $4
      RETURNING id, user_id, bio, skills, profile_picture_url, rating, total_gigs_completed;
    `;
    const result = await pool.query(query, [bio, skills, profilePictureUrl, userId]);
    return result.rows[0];
  }
}

module.exports = WorkerProfile;
