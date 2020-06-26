const mongoose = require("mongoose");
const User = require("../models/User.model");
const { hashPassword, comparePasswords } = require("../util/password");
const { check, validationResult } = require("express-validator");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (error) {
    console.log(err);
    next(err);
  }
};

exports.createUser = [
  check("name")
    .not()
    .isEmpty()
    .withMessage("Name must be provided")
    .isLength({
      min: 2,
    })
    .withMessage("Name must have two or more characters")
    .escape()
    .trim(),
  check("email").isEmail().withMessage("Provide a valid email"),
  check("telephone")
    .not()
    .isEmpty()
    .withMessage("Your must provide a telephone number")
    .isLength({
      min: 10,
    })
    .withMessage("Telephone number too short")
    .escape()
    .trim(),
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Erros in validation on client side");
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const { name, email, telephone, password } = req.body;

    try {
      // Checking if email already registered
      let user = await User.findOne({
        name: "bipi",
      });
      if (user) {
        return res.status(400).json({
          errors: {
            msg: "Email already registerd",
            user: user,
          },
        });
      }

      //Creates a new user
      user = new User({
        name,
        email,
        telephone,
        password: await hashPassword(password),
      });

      //Saving in db
      const newUser = await user.save();
      return res.status(201).json("New user " + newUser);
    } catch (error) {
      console.log("Error occured " + error);
      next(error);
    }
  },
];

exports.getUserById = (req, res, next) => {
  res.json("The user with id " + req.params.id);
};

exports.editUserById = (req, res, next) => {
  res.json("Updates and returns updated user");
};

exports.deleteUserById = (req, res, next) => {
  res.json("Delete a user by id");
};
