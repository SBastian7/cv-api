const Category = require('../models/Category');

class CategoryController {
  static async createCategory(req, res) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: "Category name is a required field" });
      }

      const newCategory = await Category.create({
        name: name,
      });

      res.status(201).json(newCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getAllCategories(req, res) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getCategory(req, res) {
    try {
      const categoryId = req.params.id;
      const category = await Category.findByPk(categoryId);

      if (!category) {
        return res.status(404).json({ error: "Category not found." });
      }

      res.status(200).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async updateCategory(req, res) {
    try {
      const categoryId = req.params.id;
      const category = await Category.findByPk(categoryId);

      if (!category) {
        return res.status(404).json({ error: "Category not found." });
      }

      const { categoryName } = req.body;

      await category.update({
        name: categoryName,
      });

      res.status(200).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async deleteCategory(req, res) {
    try {
      const categoryId = req.params.id;
      const category = await Category.findByPk(categoryId);

      if (!category) {
        return res.status(404).json({ error: "Category not found." });
      }

      await category.destroy();

      res.status(200).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = CategoryController;
