const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth/auth');

// User registration route
router.get('/register', authController.showRegisterForm);
router.post('/register', authController.registerUser);
// User login route
router.get('/login', authController.showLoginForm);
router.post('/login', authController.loginUser);
// User logout route
router.post('/logout', authController.logoutUser);

module.exports = router;