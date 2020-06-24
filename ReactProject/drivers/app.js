const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const userRoutes = require('./routers/api/user.routes');

const app = express();

//Connection to MongoDB
require('./util/db')();

//Init middleware
app.use(express.json());
app.use(morgan('combined'));

//Routes
app.use('/api/user', userRoutes);

//Error handling
app.use('*', (req, res, next) => {
    const error = new Error('Resource not found');
    error.code = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.code || 500);
    res.json({
        errors: [{
            msg: err.message
        }]
    });
});

module.exports = app;