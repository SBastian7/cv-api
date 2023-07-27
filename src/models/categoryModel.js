const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Assuming you've already set up the Sequelize instance

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Category;
