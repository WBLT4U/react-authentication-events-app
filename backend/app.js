import express from 'express';
import bodyParser from 'body-parser';
import eventRoutes from './routes/events.js';
import authRoutes from './routes/auth.js';

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// CORS Headers Setup
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all domains
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );
  next();
});

// Authentication routes (e.g., login/signup)
app.use(authRoutes);

// Protected Routes
app.use('/events', eventRoutes);

// Global Error Handling Middleware
app.use((error, req, res, next) => {
  console.error('SERVER ERROR:', error); // Debugging
  const status = error.status || 500;
  const message = error.message || 'Something went wrong.';
  res.status(status).json({ message: message });
});

// Start server on port 8080
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
