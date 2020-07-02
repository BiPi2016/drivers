const router = require('express').Router();
const userController = require('../../controllers/user.controller');
const checkAuth = require('../../util/checkAuth');

//@Method GET /api/user/
//@Desc Gets current user 
//@Access Protected
router.get('/me', checkAuth, userController.getCurrentUser);

module.exports = router;