const router = require('express').Router();
const userController = require('../../controllers/user.controller');
const checkAuth = require('../../util/checkAuth');

//@Method GET /api/user/
//@Desc Signin in user access this
//@Access Protected
router.get('/greetings', checkAuth, userController.getGreetings);

module.exports = router;