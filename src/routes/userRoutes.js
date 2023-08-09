const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authenticateToken = require('../utils/authenticateToken');

router.get('/clients', authenticateToken, UserController.getAllClients);

router.get('/clients/:id', authenticateToken, UserController.getClient);

router.get('/', authenticateToken, UserController.getAllUsers);

router.get('/:id', authenticateToken, UserController.getUser);

router.post('/', authenticateToken, UserController.createUser);

router.put('/:id', authenticateToken, UserController.updateUser);

router.delete('/:id', authenticateToken, UserController.deleteUser);

module.exports = router;
