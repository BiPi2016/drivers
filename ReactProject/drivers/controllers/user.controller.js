const mongoose = require("mongoose");
const User = require("../models/User.model");
const {
    hashPassword,
    comparePasswords
} = require("../util/password");
const {
    check,
    validationResult
} = require("express-validator");

exports.postSignIn = async (req, res, next) => {
    try {
        res.json('Signin in');
    } catch (error) {
        next(error);
    }
};