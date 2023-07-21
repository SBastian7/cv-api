const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const errorMiddleware = require('./middlewares/errorMiddleware');



// Import routes
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');
const docsRouter = require('./routes/documentationRoutes');

dotenv.config();

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cors());
app.use(express.json());
app.use(errorMiddleware);
app.use(morgan('combined'));

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());
// Parse incoming requests with urlencoded payloads
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/docs', docsRouter);
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);
app.use('/products', productRoutes);

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Internal Server Error' });
// });

module.exports = app;
