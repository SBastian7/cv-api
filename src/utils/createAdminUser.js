const bcrypt = require('bcrypt');
const User = require('../models/user');
const db = require('../config/database');

const adminUser = {
  username: 'admin',
  email: 'sebastn.molina@gmail.com',
  password: 'Mok.2022!', // Replace this with a secure password
  isAdmin: true,
};

// Check if the admin user already exists
db.get('SELECT * FROM User WHERE email = ? AND isAdmin = 1', [adminUser.email], async (err, existingAdminUser) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  // If the admin user doesn't exist, create it
  if (!existingAdminUser) {
    bcrypt.genSalt(10, async (err, salt) => {
      const hashedPassword = await bcrypt.hash(adminUser.password, salt);

      const newAdminUser = {
        ...adminUser,
        password: hashedPassword,
      };

      User.createUser(newAdminUser, (err, userId) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        console.log('Admin user created successfully.');
        process.exit(0);
      });   
    })
  } else {
    console.log('Admin user already exists.');
    process.exit(0);
  }
});
