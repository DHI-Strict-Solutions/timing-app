const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(helmet());
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/availability', require('./routes/api/availability'));
app.use('/api/schedules', require('./routes/api/schedules'));
app.use('/api/reports', require('./routes/api/reports'));

// Handle unknown routes
app.use((req, res, next) => {
  res.status(404).json({ msg: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

const PORT 
