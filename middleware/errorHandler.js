const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // MySQL error handling
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      status: 'Error',
      message: 'Duplicate entry. This school might already exist.'
    });
  }

  if (err.code === 'ER_NO_SUCH_TABLE') {
    return res.status(500).json({
      status: 'Error',
      message: 'Database table not found. Please run migrations.'
    });
  }

  // Validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'Error',
      message: err.message
    });
  }

  // Default error
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal Server Error' 
    : err.message;

  res.status(statusCode).json({
    status: 'Error',
    message: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};

module.exports = errorHandler;
