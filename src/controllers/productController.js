const Product = require("../models/product");
const generateUUIDv4 = require("../utils/generateUUIDv4");

class ProductController {
  static productItems = [];

  static createProduct(req, res) {
    const { name, description, quantity, price } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Nombre es un campo requerido" });
    }
    if (!quantity) {
      return res.status(400).json({ error: "Cantidad es un campo requerido" });
    }
    if (!price) {
      return res.status(400).json({ error: "Precio es un campo requerido" });
    }
    // Generate a unique ID (You can use UUID or any other ID generation mechanism here)
    const id = generateUUIDv4();

    const newItem = new Product(id, name, description, quantity, price);
    ProductController.productItems.push(newItem);

    res.status(201).json(newItem);
  }

  static getAllProducts(req, res) {
    console.log("---> getting prods ", ProductController)
    res.status(200).json(ProductController.productItems);
  }

  static getProduct(req, res) {
    const itemId = req.params.id;
    const item = ProductController.productItems.find(
      (item) => item.getId() === itemId
    );

    if (!item) {
      return res.status(404).json({ error: "Product item not found." });
    }

    res.status(200).json(item);
  }

  static updateProduct(req, res) {
    const itemId = req.params.id;
    const item = ProductController.productItems.find(
      (item) => item.getId() === itemId
    );

    if (!item) {
      return res.status(404).json({ error: "Product item not found." });
    }

    const { name, description, quantity, price } = req.body;

    if (name) {
      item.setName(name);
    }

    if (description) {
      item.setDescription(description);
    }

    if (quantity) {
      item.setQuantity(quantity);
    }

    if (price) {
      item.setPrice(price);
    }

    res.status(200).json(item);
  }

  static deleteProduct(req, res) {
    const itemId = req.params.id;
    const index = ProductController.productItems.findIndex(
      (item) => item.getId() === itemId
    );

    if (index === -1) {
      return res.status(404).json({ error: "Product item not found." });
    }

    const deletedItem = ProductController.productItems.splice(index, 1);
    res.status(200).json(deletedItem[0]);
  }
}

module.exports = {
  ProductController,
};
