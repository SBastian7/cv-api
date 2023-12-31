const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
  static async createUser(req, res) {
    try {
      const { username, name, email, phone } = req.body;

      if (!username || !email || !name) {
        return res
          .status(400)
          .json({ error: "Id, name and email are required fields" });
      }

      const newUser = await User.create({
        username,
        name,
        email,
        phone,
        isAdmin: false,
        isStaff: false,
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getAllClients(req, res) {
    const queryOptions = {
      where: {
        isAdmin: false,
        isStaff: false,
      }
    }
    try {
      const users = await User.findAll(queryOptions);
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getClient(req, res) {
    const userId = req.params.id;
    const queryOptions = {
      where: {
        isAdmin: false,
        isStaff: false,
        id: userId,
      }
    }
    try {
      const user = await User.findOne(queryOptions);
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const { name, email, phone } = req.body;

      const userToUpdate = await User.findByPk(userId);
      
      if (!userToUpdate) {
        return res.status(404).json({ error: "User not found." });
      }

      await userToUpdate.update({
        name,
        email,
        phone,
      });

      res.status(200).json(userToUpdate);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const userToDelete = await User.findByPk(userId);
      
      if (!userToDelete) {
        return res.status(404).json({ error: "User not found." });
      }

      const deletedUser = userToDelete.destroy();
      res.status(200).json(deletedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getUserByEmail(email) {
    try {
      const user = await User.findOne({
        where: { email: email },
      });
      return user;
    } catch (error) {
      console.error(error);
      throw new Error('Internal server error');
    }
  }

  static async loginAdmin(req, res) {
    const { email, password } = req.body;
    if (!email) {
      return res.status(500).json({ message: "Email is required" });
    }
    if (!password) {
      return res.status(500).json({ message: "Password is required" });
    }

    // Check if the email exists in the database
    try {
      const user = await UserController.getUserByEmail(email);

      if (!(user || user.isAdmin)) {
        // Admin not found or not an admin user
        return res.status(401).json({ message: "Credenciales incorrectas." });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res.status(401).json({ message: "Credenciales incorrectas." });
      }

      const token = jwt.sign({ id: user.id, isAdmin: true }, process.env.SECRET_KEY, {});

      // Send the token in the response
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = UserController;
