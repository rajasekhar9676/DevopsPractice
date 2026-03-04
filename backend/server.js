import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import ideaRoutes from './routes/ideas.js';
import validationRoutes from './routes/validation.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ideas', ideaRoutes);
app.use('/api/validation', validationRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Root route – works when hosted or on any port
app.get('/', (req, res) => {
  res.json({
    message: 'Founder OS API',
    version: '1.0',
    docs: {
      health: '/api/health',
      auth: '/api/auth',
      ideas: '/api/ideas',
      validation: '/api/validation',
    },
  });
});

// Catch-all for unmatched routes – return JSON instead of "Cannot GET /"
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
    method: req.method,
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/founderos')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

