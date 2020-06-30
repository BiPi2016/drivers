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

    const {
      name,
      email,
      telephone,
      password
    } = req.body;

    try {
      // Checking if email already registered
      let user = await User.findOne({
        email: email,
      });
      if (user) {
        return res.status(400).json({
          errors: {
            msg: "Email already registerd",
          },
        });
      }

      //Creates a new user
      const hashed = await hashPassword(password);
      if (typeof (hashed) === 'Error') {
        return res.status(400).json({
          errors: [{
            msg: 'Server error'
          }]
        })
      }
      user = new User({
        name,
        email,
        telephone,
        password: hashed,
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

exports.getUserById = async (req, res, next) => {
  console.log("Fetching one specific user by id " + req.params.id);
  try {
    const user = await await User.findById(
      req.params.id,
      "name telephone email"
    );
    res.json(user);
  } catch (error) {
    console.log("Error fetching user");
    next(err);
  }
};

exports.editUserById = (req, res, next) => {
  res.json("Updates and returns updated user");
};

exports.deleteUserById = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser === null) {
      return res.status(400).json({
        errors: [{
          msg: new Error('No such user')
        }]
      })
    }
    console.log("Deleting the user with id " + req.params.id);
    return res.status(204).json('User deleted ' + deletedUser);
  } catch (error) {
    next(error);
  }
};