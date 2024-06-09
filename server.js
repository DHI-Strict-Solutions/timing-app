const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

// Переконайтеся, що 'app' не оголошено двічі
let app;
if (!global.hasOwnProperty('app')) {
  global.app = express();
  app = global.app;
} else {
  app = global.app;
}

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/schedules', require('./routes/api/schedules'));
app.use('/api/availability', require('./routes/api/availability'));
app.use('/api/reports', require('./routes/api/reports'));

// Check if the PORT variable has already been declared
if (!global.PORT) {
  global.PORT = process.env.PORT || 5001;
}

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Handle unknown routes
app.use((req, res, next) => {
  res.status(404).json({ msg: 'Route not found' });
});

app.listen(global.PORT, () => console.log(`Server started on port ${global.PORT}`));
