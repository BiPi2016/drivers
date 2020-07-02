const router = require('express').Router();
const authConroller = require('../../controllers/auth.controller');
const auth = require('../../util/checkAuth');

//@Method POST /api/auth/signIn
//@Desc signs in the user, returns an object with {msg, user:{userID: blablabla}} format
//@Access public
router.post('/signIn', authConroller.postSignIn);

module.exports = router;