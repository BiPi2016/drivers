const mongoose = require('mongoose');
const User = require('../models/User.model');

exports.getAllUsers = (req, res, next) => {
    res.json('All users')
};

exports.getUserById = (req, res, next) => {
    res.json('The user with id ' + req.params.id);
};


exports.createUser = (req, res, next) => {
    res.json('Creates a new user');
}

exports.editUserById = (req, res, next) => {
    res.json('Updates and returns updated user');
}

exports.deleteUserById = (req, res, next) => {
    res.json('Delete a user by id');
};