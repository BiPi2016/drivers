const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

//Connection to MongoDB
require('./util/db')();

app.use(express.json());
app.use(morgan('combined'));

app.listen(port, () => console.log(`Server listening at port ${port}`));