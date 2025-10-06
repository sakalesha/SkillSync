const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/UserRoutes.js');
const jobRoutes = require('./routes/JobRoutes.js');
const skillGapRoutes = require('./routes/SkillGapRoutes.js');
const analyticsRoutes = require('./routes/AnalyticsRoutes.js');

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // Body parser

// Routes
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/skill-gap', skillGapRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error handling for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
