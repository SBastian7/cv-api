const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class User {
  // Create a new user
  static createUser(user, callback) {
    const { username, email, password, isAdmin } = user;
    const id = uuidv4(); // Generate a new UUID v4 for the user
    db.run(
      'INSERT INTO User (id, username, email, password, isAdmin) VALUES (?, ?, ?, ?, ?)',
      [id, username, email, password, isAdmin ? 1 : 0],
      function (err) {
        if (err) {
          console.error(err);
          callback(err, null);
        } else {
          callback(null, id); // Use the generated UUID v4 as the user ID
        }
      }
    );
  }

  // Get all users
  static getAllUsers(callback) {
    db.all('SELECT * FROM User', (err, users) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        callback(null, users);
      }
    });
  }

  // Get a user by ID
  static getUserById(id, callback) {
    db.get('SELECT * FROM User WHERE id = ?', [id], (err, user) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        callback(null, user);
      }
    });
  }

  // Get a user by email
  static getUserByEmail(email, callback) {
    db.get('SELECT * FROM User WHERE email = ?', email, (err, user) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        callback(null, user);
      }
    });
  }

  // Update a user by ID
  static updateUser(id, updatedUser, callback) {
    const { name, email, password, isAdmin } = updatedUser;
    db.run(
      'UPDATE User SET name = ?, email = ?, password = ?, isAdmin = ? WHERE id = ?',
      [name, email, password, isAdmin ? 1 : 0, id],
      (err) => {
        if (err) {
          console.error(err);
          callback(err);
        } else {
          callback(null);
        }
      }
    );
  }

  // Delete a user by ID
  static deleteUser(id, callback) {
    db.run('DELETE FROM User WHERE id = ?', [id], (err) => {
      if (err) {
        console.error(err);
        callback(err);
      } else {
        callback(null);
      }
    });
  }
}

module.exports = User;
