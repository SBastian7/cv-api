const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Middleware for Admin Authorization
const isAdmin = (req, res, next) => {
  // Implement your admin authorization logic here
  // For example, you can check if the user making the request is an admin or not
  // This middleware should be added to routes that require admin access
  // For simplicity, we'll assume that the user is an admin for all routes in this example
  // In a real-world application, you would implement a proper admin check based on your authentication mechanism.
  next();
};

router.post('/login', isAdmin, UserController.loginAdmin);

module.exports = router;
