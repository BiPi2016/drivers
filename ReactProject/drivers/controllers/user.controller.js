const mongoose = require("mongoose");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePasswords } = require("../util/password");
const { check, validationResult } = require("express-validator");

exports.postSignIn = [
  check("email").isEmail().withMessage("Provide a valid email"),
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
          errors: errors.array(),
        });
      }

      //Fetching the user
      const { email, password } = req.body;
      const user = await User.findOne({
        email: email,
      });
      if (user || user !== null) {
        const isAuthenticUser = await comparePasswords(password, user.password);
        if (isAuthenticUser) {
          console.log(isAuthenticUser);
          const payload = {
            userId: user._id,
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 3600,
          });
          return res.json({
            msg: "Sign in successful",
            toekn: token,
          });
        }
      }
      //No registered email or matching password
      return res.status(401).json({
        errors: [
          {
            msg: "Authenication failed, wrond email or password",
          },
        ],
      });
    } catch (error) {
      next(error);
    }
  },
];
