const Category = require("../models/Category");
const generateUUIDv4 = require("../utils/generateUUIDv4");

class CategoryController {
  static categories = [];

  static getAllCategories() {
    return this.categories;
  }

  static getCategory(categoryId) {
    return this.categories.find((category) => category.id === categoryId);
  }

  static createCategory(categoryName) {
    const newCategoryId = generateUUIDv4();
    const newCategory = new Category(newCategoryId, categoryName);
    this.categories.push(newCategory);
    return newCategory;
  }

  static updateCategory(categoryId, categoryName) {
    const categoryToUpdate = this.categories.find(
      (category) => category.id === categoryId
    );
    if (categoryToUpdate) {
      categoryToUpdate.name = categoryName;
      return categoryToUpdate;
    }
    return null;
  }

  static deleteCategory(categoryId) {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id === categoryId
    );
    if (categoryIndex !== -1) {
      const deletedCategory = this.categories.splice(categoryIndex, 1)[0];
      return deletedCategory;
    }
    return null;
  }
}

module.exports = {
  CategoryController,
};
