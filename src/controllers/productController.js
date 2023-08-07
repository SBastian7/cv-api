const Category = require('../models/categoryModel');
const Product = require('../models/productModel');

class ProductController {
  static async createProduct(req, res) {
    try {
      const { name, description, quantity, price, categoryId } = req.body;

      if (!name) {
        return res.status(400).json({ error: "Name is a required field" });
      }
      if (!quantity) {
        return res.status(400).json({ error: "Quantity is a required field" });
      }
      if (!price) {
        return res.status(400).json({ error: "Price is a required field" });
      }
      if (!categoryId) {
        return res.status(400).json({ error: "Category is a required field" });
      }

      const newProduct = await Product.create({
        name,
        description,
        quantity,
        price,
        categoryId,
      });

      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Static method to get all Product items
  static async getAllProducts(req, res) {
    try {
      const products = await Product.findAll({
        attributes: ["id", "name", "description", "quantity", "price", "createdAt"],
        include: [
          {
            model: Category,
            attributes: ["id", "name"],
          }
        ]
      });
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Static method to get a specific Product item by ID
  static async getProduct(req, res) {
    try {
      const productId = req.params.id;
      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ error: "Product item not found." });
      }

      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Static method to update an existing Product item
  static async updateProduct(req, res) {
    try {
      const productId = req.params.id;
      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ error: "Product item not found." });
      }

      const { name, description, quantity, price, categoryId } = req.body;

      await product.update({
        name,
        description,
        quantity,
        price,
        categoryId,
      });

      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Static method to delete an existing Product item
  static async deleteProduct(req, res) {
    try {
      const productId = req.params.id;
      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ error: "Product item not found." });
      }

      await product.destroy();
      
      const productList = await Product.findAll();

      res.status(200).json(productList);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = ProductController;
