const { pool } = require('../config/database');

class TillCredential {
  // Create till credentials for a worker
  static async create(workerId, tillNumber, merchantId, phoneNumber) {
    const query = `
      INSERT INTO till_credentials (worker_id, till_number, merchant_id, phone_number, is_active, created_at, updated_at)
      VALUES ($1, $2, $3, $4, true, NOW(), NOW())
      RETURNING id, worker_id, till_number, merchant_id, phone_number, is_active;
    `;
    const result = await pool.query(query, [workerId, tillNumber, merchantId, phoneNumber]);
    return result.rows[0];
  }

  // Get till credentials by worker ID
  static async findByWorkerId(workerId) {
    const query = 'SELECT * FROM till_credentials WHERE worker_id = $1 AND is_active = true;';
    const result = await pool.query(query, [workerId]);
    return result.rows[0];
  }

  // Update till credentials
  static async update(workerId, tillNumber, merchantId, phoneNumber) {
    const query = `
      UPDATE till_credentials
      SET till_number = $1, merchant_id = $2, phone_number = $3, updated_at = NOW()
      WHERE worker_id = $4
      RETURNING id, worker_id, till_number, merchant_id, phone_number, is_active;
    `;
    const result = await pool.query(query, [tillNumber, merchantId, phoneNumber, workerId]);
    return result.rows[0];
  }

  // Deactivate till credentials
  static async deactivate(workerId) {
    const query = `
      UPDATE till_credentials
      SET is_active = false, updated_at = NOW()
      WHERE worker_id = $1
      RETURNING id, worker_id, is_active;
    `;
    const result = await pool.query(query, [workerId]);
    return result.rows[0];
  }
}

module.exports = TillCredential;
