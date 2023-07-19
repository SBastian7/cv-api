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

// Admin Dashboard - GET
router.get('/', isAdmin, (req, res) => {
  // Render the admin dashboard view
  res.render('adminLogin', { pageTitle: 'Admin Dashboard' });
});

router.get('/dashboard', isAdmin, UserController.getAllUsers);

router.get('/dashboard/users/:id', isAdmin, UserController.getUserById);


router.post('/login', isAdmin, UserController.loginAdmin);

// Users List - GET
router.get('/users', isAdmin, UserController.getAllUsers);

// Create User - POST
router.post('/users', isAdmin, UserController.createUser);

// Update User - PUT
router.put('/users/:id', isAdmin, UserController.updateUser);

// Delete User - DELETE
router.delete('/users/:id', isAdmin, UserController.deleteUser);

module.exports = router;
