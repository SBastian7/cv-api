const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Assuming you've already set up the Sequelize instance

const Category = require('./categoryModel'); // Import the Category model

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

// Define the association between Product and Category
Product.belongsTo(Category, {
  foreignKey: 'categoryId',
  onDelete: 'CASCADE',
});

module.exports = Product;
