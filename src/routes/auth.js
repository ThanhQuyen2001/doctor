const express = require('express');
const router = express.Router();
const checkLoggedIn = require('../core/auth');

const authController = require('../app/controllers/AuthController');

router.post('/login', authController.login);
router.get('/profile', checkLoggedIn, authController.getProfile);
router.get('/access-token', authController.getNewToken);

module.exports = router;
