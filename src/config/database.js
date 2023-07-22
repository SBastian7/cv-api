const { Sequelize } = require('sequelize');
const path = require('path');

const databasePath = path.join(__dirname, '../data/store.sqlite3');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: databasePath,
});

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Export the Sequelize instance and the testConnection function
module.exports = {
  sequelize,
  testConnection,
};
