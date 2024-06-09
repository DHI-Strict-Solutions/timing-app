const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Apply rate limiting to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: 'Too many requests from this IP, please try again later.'
});

app.use(limiter);

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/schedules', require('./routes/api/schedules'));
app.use('/api/availability', require('./routes/api/availability'));
app.use('/api/reports', require('./routes/api/reports'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
