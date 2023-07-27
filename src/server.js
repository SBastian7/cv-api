const app = require('./api');
const { sequelize, testConnection } = require('./config/database'); // Import the Sequelize instance and testConnection function
const port = process.env.PORT || 4200;

// Synchronize the models with the database
async function initializeServer() {
  try {
    // Test the database connection
    await testConnection();

    // Synchronize the models with the database
    await sequelize.sync();
    console.log('Database synchronized successfully.');

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error initializing the server:', error);
  }
}

initializeServer();
