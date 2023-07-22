const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');

// Route to create a new Category item
router.post('/', CategoryController.createCategory);

// Route to get all Category items
router.get('/', CategoryController.getAllCategories);

// Route to get a specific Category item by ID
router.get('/:id', CategoryController.getCategory);

// Route to update an existing Category item
router.put('/:id', CategoryController.updateCategory);

// Route to delete an existing Category item
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;
