const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const errorMiddleware = require('./middlewares/errorMiddleware');


// Import routes
const userRoutes = require('./routes/userRoutes');
const skillRoutes = require('./routes/skillRoutes');
const projectRoutes = require('./routes/projectRoutes');
const docsRouter = require('./routes/documentationRoutes');
const educationRoutes = require('./routes/educationRoutes');

// Middleware
app.use(cors());
app.use(express.json());
app.use(errorMiddleware);
app.use(morgan('combined'));

// Routes
app.use('/docs', docsRouter);
app.use('/users', userRoutes);
app.use('/skills', skillRoutes);
app.use('/projects', projectRoutes);
app.use('/education', educationRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
