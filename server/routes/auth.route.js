const express = require('express');
const asyncHandler = require('express-async-handler')
const passport = require('passport');
const { UserController } = require('../modules/user');
const { AuthController } = require('../modules/auth');
const config = require('../config/config');

const router = express.Router();
module.exports = router;

router.post('/register', asyncHandler(AuthController.register), AuthController.login);
router.post('/login', passport.authenticate('local', { session: false }), AuthController.login);
router.get('/me', passport.authenticate('jwt', { session: false }), AuthController.login);
