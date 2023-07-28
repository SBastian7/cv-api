const { Sequelize } = require('sequelize');

const connectionString = process.env.DATABASE_URI || 'postgres://admin:ow4mnpyJPY4t48Q3MiZt2RQwaHA1988B@dpg-cj0uhf5ph6enmk6enong-a.oregon-postgres.render.com/tribu';

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
