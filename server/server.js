const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const { connectDatabase } = require('./config/database');

const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const qualificationRoutes = require('./routes/qualificationRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// ✅ CORS - Allow both localhost and production
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? "https://mnpat-git-main-1mnpats-projects.vercel.app"
    : ["http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:3000"],
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));

// Root route
app.get('/', (_req, res) =>
  res.json({ message: 'Welcome to the Portfolio Application' })
);

// API routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/qualifications', qualificationRoutes);
app.use('/api/contacts', contactRoutes);

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5001;

connectDatabase(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  });

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
