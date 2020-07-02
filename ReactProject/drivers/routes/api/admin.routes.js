const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin.controller');

//@Method GET /api/admin/users/
//@Desc returns all users
//@Access public
router.get('/users/', adminController.getAllUsers);

//@Method POST /api/admin/users/:id
//@Desc Register a new user
//@Access protected
router.post('/users/create', adminController.createUser);

//@Method GET /api/admin/users/:id
//@Desc returns one user with given id
//@Access protected
router.get('/users/:id', adminController.getUserById);

//@Method PUT /api/admin/users/:id
//@Desc Updates a user with given id
//@Access protected
router.put('/users/update/:id', adminController.editUserById);

//@Method DELETE /api/admin/users/:id
//@Desc Deletes a user with given id
//@Access protected
router.delete('/users/delete/:id', adminController.deleteUserById);

module.exports = router;