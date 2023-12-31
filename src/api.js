require('dotenv').config();

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const outcomeRoutes = require('./routes/outcomeRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const docsRouter = require('./routes/documentationRoutes');


// Middleware
app.use(cors());
app.use(express.json());
app.use(errorMiddleware);
app.use(morgan('combined'));

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/docs', docsRouter);
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);
app.use('/income', incomeRoutes);
app.use('/outcome', outcomeRoutes);
app.use('/products', productRoutes);
app.use('/category', categoryRoutes);

app.get('/', (req, res) => {
    res.send('Welcome API Tribu');
});


module.exports = app;
