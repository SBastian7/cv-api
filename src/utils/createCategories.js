const Category = require("../models/categoryModel");

const categories = [
  {
    name: "Cigarrillos"
  },
  {
    name: "Cerveza"
  },
  {
    name: "Licores"
  },
  {
    name: "Sodas"
  },
];

const createCategories = async () => {
  try {
      categories.map(async (categorie) => {
        await Category.create(categorie);
      })
      console.log("Categories created successfully.");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

createCategories();
