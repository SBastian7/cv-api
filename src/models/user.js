const db = require("../config/database");

class User {
  static getAllUsers(callback) {
    db.all("SELECT * FROM User", (err, rows) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  }

  static getUserById(id, callback) {
    db.get("SELECT * FROM User WHERE id = ?", [id], (err, row) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        callback(null, row);
      }
    });
  }

  static createUser(user, callback) {
    const { username, password, email, full_name, bio } = user;
    db.run(
      "INSERT INTO User (username, password, email, full_name, bio) VALUES (?, ?, ?, ?, ?)",
      [username, password, email, full_name, bio],
      function (err) {
        if (err) {
          console.error(err);
          callback(err, null);
        } else {
          callback(null, this.lastID);
        }
      }
    );
  }

  static updateUser(id, user, callback) {
    const { username, password, email, full_name, bio } = user;
    db.run(
      "UPDATE User SET username = ?, password = ?, email = ?, full_name = ?, bio = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [username, password, email, full_name, bio, id],
      (err) => {
        if (err) {
          console.error(err);
          callback(err, null);
        } else {
          callback(null);
        }
      }
    );
  }

  static deleteUser(id, callback) {
    db.run("DELETE FROM User WHERE id = ?", [id], (err) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        callback(null);
      }
    });
  }
}

module.exports = User;
