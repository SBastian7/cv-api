const express = require('express');
const router = express.Router();
const { ProductController } = require('../controllers/productController');
const authenticateToken = require('../utils/authenticateToken');

// Route to create a new Product item
router.post('/', authenticateToken, ProductController.createProduct);

// Route to get all Product items
router.get('/', authenticateToken, ProductController.getAllProducts);

// Route to get a specific Product item by ID
router.get('/:id', authenticateToken, ProductController.getProduct);

// Route to update an existing Product item
router.put('/:id', authenticateToken, ProductController.updateProduct);

// Route to delete an existing Product item
router.delete('/:id', authenticateToken, ProductController.deleteProduct);

module.exports = router;
