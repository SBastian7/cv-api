const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const authenticateToken = require('../utils/authenticateToken');

router.post('/', authenticateToken, ProductController.createProduct);

router.get('/', authenticateToken, ProductController.getAllProducts);

router.get('/:id', authenticateToken, ProductController.getProduct);

router.put('/:id', authenticateToken, ProductController.updateProduct);

router.delete('/:id', authenticateToken, ProductController.deleteProduct);

module.exports = router;
