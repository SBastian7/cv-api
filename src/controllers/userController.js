const User = require("../models/User");

class UserController {
  static async createUser(req, res) {
    try {
      const { username, email, password, isAdmin } = req.body;

      if (!username || !email || !password) {
        return res
          .status(400)
          .json({ error: "Username, email, and password are required fields" });
      }

      const newUser = await User.createUser({
        username,
        email,
        password,
        isAdmin: isAdmin ? true : false,
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await User.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.getUserById(userId);

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
      const { username, email, password, isAdmin } = req.body;

      const updatedUser = await User.updateUser(userId, {
        username,
        email,
        password,
        isAdmin: isAdmin ? true : false,
      });

      if (updatedUser[0] === 0) {
        return res.status(404).json({ error: "User not found." });
      }

      res.status(200).json({ message: "User updated successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const deletedUser = await User.deleteUser(userId);

      if (!deletedUser) {
        return res.status(404).json({ error: "User not found." });
      }

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
      return res.status(500).json({ error: "Email is required" });
    }
    if (!password) {
      return res.status(500).json({ error: "Password is required" });
    }

    // Check if the email exists in the database
    try {
      const user = await UserController.getUserByEmail(email);

      if (!user || !user.isAdmin) {
        // Admin not found or not an admin user
        return res.status(401).json({ error: "Credenciales incorrectas." });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res.status(401).json({ error: "Credenciales incorrectas." });
      }

      const token = jwt.sign({ id: user.id, isAdmin: true }, secretKey, {
        expiresIn: "24h", // Set the token expiration time (e.g., 1 hour)
      });

      // Send the token in the response
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = UserController;
