const { Sequelize } = require('sequelize');

const connectionString = process.env.DATABASE_URI || 'postgresql://inventory_db_j3t5_user:NAPtesw3SpPIhSmF1IrHgvgzvdGt4wno@dpg-cs8okrtds78s738ivol0-a.oregon-postgres.render.com/inventory_db_j3t5';

const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Add this line if you're using self-signed certificates or running on a local development environment without SSL
    },
  },
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = {
  sequelize,
  testConnection,
};
