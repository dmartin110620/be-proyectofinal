const express = require('express');
const { loginUser, registerUser } = require('../controllers/authController.js');
const router = express.Router();

router.post('/login', loginUser);  // Login route
router.post('/register', registerUser);  // Register route

module.exports = router;
