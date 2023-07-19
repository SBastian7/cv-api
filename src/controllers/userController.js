const User = require("../models/user");

class UserController {
  static getAllUsers(req, res) {
    User.getAllUsers((err, users) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json(users);
      }
    });
  }

  static getUserById(req, res) {
    const id = req.params.id;
    User.getUserById(id, (err, user) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else if (!user) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.json(user);
      }
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
}

module.exports = UserController;
