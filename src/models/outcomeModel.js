const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Assuming you've already set up the Sequelize instance

const User = require('./userModel'); // Import the User model
const Product = require('./productModel'); // Import the Product model

const Outcome = sequelize.define('Outcome', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

const OutcomeType = sequelize.define('OutcomeType', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

const OutcomeProduct = sequelize.define('OutcomeProduct', {
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  
  Outcome.belongsToMany(Product, { through: OutcomeProduct });
  Product.belongsToMany(Outcome, { through: OutcomeProduct });
  Outcome.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  });
  Outcome.belongsTo(OutcomeType, {
    foreignKey: 'outcomeType',
    onDelete: 'CASCADE',
  });

module.exports = { Outcome, OutcomeProduct, OutcomeType };
