const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken module
const secretKey = 'your_secret_key'; // Replace this with your actual secret key for JWT

const User = require("../models/user");

class UserController {
  // Get all users
  static getAllUsers(req, res) {
    User.getAllUsers((err, users) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Render the dashboard.ejs template and pass the users' data
      res.render('adminDashboard', { users });
    });
  }

  static getUserById(req, res) {
    const id = req.params.id;
    User.getUserById(id, (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Render the dashboard.ejs template and pass the users' data
      res.render('userDetails', { user });
    });
  }

  static createUser(req, res) {
    const user = req.body;
    User.createUser(user, (err, userId) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(201).json({ id: userId });
      }
    });
  }

  static updateUser(req, res) {
    const id = req.params.id;
    const user = req.body;
    User.updateUser(id, user, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.sendStatus(204);
      }
    });
  }

  static deleteUser(req, res) {
    const id = req.params.id;
    User.deleteUser(id, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.sendStatus(204);
      }
    });
  }

  // Admin Login
  static loginAdmin(req, res) {
    const { email, password } = req.body;
    
    // Check if the email exists in the database
    User.getUserByEmail(email, (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      
      if (!user || !user.isAdmin) {
        // Admin not found or not an admin user
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Compare the password with the hashed password in the database
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (!isMatch) {
          // Password doesn't match
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Create a JWT token for admin authentication
        const token = jwt.sign({ id: user.id, isAdmin: true }, secretKey, {
          expiresIn: '1h', // Set the token expiration time (e.g., 1 hour)
        });

        // Send the token in the response
        // res.json({ token });
        res.redirect('/admin/dashboard')
      });
    });
  }
}

module.exports = UserController;
