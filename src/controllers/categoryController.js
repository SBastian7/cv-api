const Category = require("../models/category");
const generateUUIDv4 = require("../utils/generateUUIDv4");

class CategoryController {
  static categories = [];

  static createCategory(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is a required field" });
    }

    // Generate a unique ID (You can use UUID or any other ID generation mechanism here)
    const id = generateUUIDv4();

    const newCategory = new Category(id, name);
    CategoryController.categories.push(newCategory);

    res.status(201).json(newCategory);
  }

  static getAllCategories(req, res) {
    console.log("---> getting cvats ", CategoryController)
    res.status(200).json(CategoryController.categories);
  }

  static getCategory(req, res) {
    const categoryId = req.params.id;
    const category = CategoryController.categories.find(
      (category) => category.id === categoryId
    );

    if (!category) {
      return res.status(404).json({ error: "Category item not found." });
    }

    res.status(200).json(category);
  }

  static updateCategory(req, res) {
    const categoryId = req.params.id;
    const category = CategoryController.categories.find(
      (category) => category.id === categoryId
    );

    if (!category) {
      return res.status(404).json({ error: "Category item not found." });
    }

    const { categoryName } = req.body;

    if (!categoryName) {
      return res.status(400).json({ error: "Category Name is a required field" });
    }

    category.name = categoryName;

    res.status(200).json(category);
  }

  static deleteCategory(req, res) {
    const categoryId = req.params.id;
    const index = CategoryController.categories.findIndex(
      (category) => category.id === categoryId
    );

    if (index === -1) {
      return res.status(404).json({ error: "Category item not found." });
    }

    const deletedCategory = CategoryController.categories.splice(index, 1);
    res.status(200).json(deletedCategory[0]);
  }
}

module.exports = {
  CategoryController,
};
