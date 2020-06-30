const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
//const cors = require("cors");
const adminRoutes = require("./routes/api/admin.routes");
const userRoutes = require('./routes/api/user.route');

const app = express();

//Connection to MongoDB
require("./util/db")();

//CORS
//app.use(cors);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Controll-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH"
    );
    return res.status(200).json({});
  }
  next();
});

//Init middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(morgan("combined"));

//Routes
app.use("/api/admin", adminRoutes);
app.use('/api/user', userRoutes);

//Error handling
app.use((req, res, next) => {
  const error = new Error("Resource not found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: [{
      msg: err.message,
    }, ],
  });
});

module.exports = app;