const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// GET /users
router.get('/', UserController.getAllUsers);

// GET /users/:id
router.get('/:id', UserController.getUserById);

// POST /users
router.post('/', UserController.createUser);

// PUT /users/:id
router.put('/:id', UserController.updateUser);

// DELETE /users/:id
router.delete('/:id', UserController.deleteUser);

module.exports = router;
