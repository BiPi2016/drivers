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

//Confirms email and password, Signs in the user and returns the token or error message
exports.postSignIn = [
    check("email").isEmail().withMessage("Provide a valid email"),
    check("password")
    .not()
    .isEmpty()
    .withMessage("You must provide a password")
    .escape()
    .trim(),
    async (req, res, next) => {
        try {
            //Validation results
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    errors: errors.array(),
                });
            }

            //Fetching the user
            const {
                email,
                password
            } = req.body;
            const user = await User.findOne({
                email: email,
            });
            if (user || user !== null) {
                const isAuthenticUser = await comparePasswords(password, user.password);
                if (isAuthenticUser) {
                    console.log(isAuthenticUser);
                    const payload = {
                        userID: user._id,
                    };
                    const token = jwt.sign(payload, process.env.JWT_SECRET, {
                        expiresIn: 3600,
                    });
                    res.setHeader('authorization', `bearer ${token}`);
                    return res.json({
                        msg: "Sign in successful",
                        token: token,
                    });
                }
            }
            //No registered email or matching password
            return res.status(401).json({
                errors: [{
                    msg: "Authenication failed, wrond email or password",
                }, ],
            });
        } catch (error) {
            next(error);
        }
    },
];