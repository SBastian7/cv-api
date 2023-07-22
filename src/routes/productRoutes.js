const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

// Route to create a new Product item
router.post('/', ProductController.createProduct);

// Route to get all Product items
router.get('/', ProductController.getAllProducts);

// Route to get a specific Product item by ID
router.get('/:id', ProductController.getProduct);

// Route to update an existing Product item
router.put('/:id', ProductController.updateProduct);

// Route to delete an existing Product item
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
