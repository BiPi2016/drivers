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

exports.postSignIn = [
    check('email').isEmail().withMessage("Provide a valid email"),
    check("password")
    .not()
    .isEmpty()
    .withMessage("You must provide a password")
    .isLength({
        min: 6,
    })
    .withMessage("Password must have 6 or more characters")
    .escape()
    .trim(),
    async (req, res, next) => {
        try {
            //Validation results
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    errors: errors.array()
                });
            }

            //Fetching the user
            const {
                email,
                password
            } = req.body;
            const user = await User.findOne({
                email: email
            });
            if (user || user !== null) {
                const isAuthenticUser = await comparePasswords(password, user.password);
                if (isAuthenticUser) { // User found and password matches the hash
                    return res.json('Authentication ' + isAuthenticUser);
                }
            }
            //No registered email or matching password
            return res.status(401).json({
                errors: [{
                    msg: 'Authenication failed, wrond email or password'
                }]
            });
        } catch (error) {
            next(error);
        }
    }
];