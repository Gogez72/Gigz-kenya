// GigzKe Backend Server
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pg = require('pg');

// Import routes (to be created)
// const authRoutes = require('./routes/auth');
// const gigRoutes = require('./routes/gigs');
// const workerRoutes = require('./routes/workers');
// const paymentRoutes = require('./routes/payments');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection pool
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'GigzKe API is running ✅' });
});

// Routes (to be implemented)
// app.use('/api/auth', authRoutes);
// app.use('/api/gigs', gigRoutes);
// app.use('/api/workers', workerRoutes);
// app.use('/api/payments', paymentRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 GigzKe Backend running on http://localhost:${PORT}`);
});

module.exports = { app, pool };
