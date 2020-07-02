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

//Returns current user
exports.getCurrentUser = async (req, res, next) => {
    try {
        console.log('getting current user')
        const id = req.user.userID;
        console.log('User ' + id)
        if (!id) {
            next(err);
        }
        const user = await (await User.findById(id).select('-password'));
        return res.json(user);
    } catch (error) {
        return res.status(500).json({
            errors: {
                msg: 'Server error'
            }
        });
    }
};