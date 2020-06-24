const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user.controller');

//@Method GET /api/user/
//@Desc returns all users
//@Access public
router.get('/', userController.getAllUsers);

//@Method POST /api/user/:id
//@Desc Register a new user
//@Access protected
router.post('/', userController.createUser);

//@Method GET /api/user/:id
//@Desc returns one user with given id
//@Access protected
router.get('/:id', userController.getUserById);

//@Method PUT /api/user/:id
//@Desc Updates a user with given id
//@Access protected
router.put('/update/:id', userController.editUserById);

//@Method DELETE /api/user/:id
//@Desc Deletes a user with given id
//@Access protected
router.delete('/delete/:id', userController.deleteUserById);

module.exports = router;