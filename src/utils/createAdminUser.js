const bcrypt = require('bcrypt');
const User = require('../models/User');

const adminUser = {
  username: 'admin',
  email: 'sebastn.molina@gmail.com',
  password: 'Mok.2022!', // Replace this with a secure password
  isAdmin: true,
};

const createAdminUser = async () => {
  try {
    // Check if the admin user already exists
    const existingAdminUser = await User.findOne({
      where: { email: adminUser.email, isAdmin: true },
    });

    if (!existingAdminUser) {
      // Generate a salt and hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminUser.password, salt);

      // Create the new admin user with hashed password
      const newAdminUser = await User.create({
        ...adminUser,
        password: hashedPassword,
      });

      console.log('Admin user created successfully.');
    } else {
      console.log('Admin user already exists.');
    }
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

createAdminUser();
