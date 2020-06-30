const router = require('express').Router();
const userController = require('../../controllers/user.controller');

router.post('/signin', userController.postSignIn);

module.exports = router;