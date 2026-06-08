const router = require('express').Router();
const { register, login, getMe } = require('./auth.controller');
const { validateRegister, validateLogin } = require('./auth.validation');
const { protect } = require('../../middleware/auth.middleware');

router.post('/register', validateRegister, register);
router.post('/login',    validateLogin,    login);
router.get('/me',        protect,          getMe);

module.exports = router;
