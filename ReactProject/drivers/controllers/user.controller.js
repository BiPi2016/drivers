const mongoose = require("mongoose");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const {
    hashPassword,
    comparePasswords
} = require("../util/password");
const {
    check,
    validationResult
} = require("express-validator");


exports.getGreetings = (req, res, next) => {
    res.json('Greetings ' + req.user.userID);
}