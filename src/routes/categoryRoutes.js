const express = require('express');
const router = express.Router();
const { CategoryController } = require('../controllers/CategoryController');
const authenticateToken = require('../utils/authenticateToken');

router.post('/', authenticateToken, CategoryController.createCategory);

router.get('/', authenticateToken, CategoryController.getAllCategories);

router.get('/:id', authenticateToken, CategoryController.getCategory);

router.put('/:id', authenticateToken, CategoryController.updateCategory);

router.delete('/:id', authenticateToken, CategoryController.deleteCategory);

module.exports = router;
