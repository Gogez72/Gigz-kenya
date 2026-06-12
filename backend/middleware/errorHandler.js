// Global error handler
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let statusCode = 500;
  let message = 'Internal Server Error';

  // Handle specific error types
  if (err.message.includes('User with this email already exists')) {
    statusCode = 400;
    message = err.message;
  } else if (err.message.includes('User not found')) {
    statusCode = 404;
    message = err.message;
  } else if (err.message.includes('Invalid password')) {
    statusCode = 401;
    message = err.message;
  } else if (err.message.includes('Invalid or expired token')) {
    statusCode = 401;
    message = err.message;
  }

  res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;
