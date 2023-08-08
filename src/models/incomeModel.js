const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = require('./userModel');
const Product = require('./productModel');

const Income = sequelize.define('Income', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

// Define the association between Income and User
Income.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

// Define the association between Income and Product using a through table
const IncomeProduct = sequelize.define('IncomeProduct', {
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Income.belongsToMany(Product, { through: IncomeProduct });
Product.belongsToMany(Income, { through: IncomeProduct });

module.exports = { Income, IncomeProduct };
