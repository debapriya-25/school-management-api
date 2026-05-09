const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const schoolRoutes = require('./routes/schools');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'Success',
    message: 'School Management API is running successfully',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      addSchool: '/api/addSchool',
      listSchools: '/api/listSchools'
    },
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'School Management API is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api', schoolRoutes);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'Error',
    message: 'Route not found'
  });
});

// Global error handlers to prevent app crash
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

// Start server with safe startup
try {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Root URL: http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
  });
} catch (err) {
  console.error('Failed to start server:', err.message);
}

module.exports = app;