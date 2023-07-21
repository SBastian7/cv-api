const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Create a new SQLite database instance
const dbPath = path.resolve(__dirname, "../data/cv.db");
const db = new sqlite3.Database(dbPath);

// Create the User table
db.run(`
    CREATE TABLE IF NOT EXISTS User (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      about TEXT,
      isAdmin INTEGER DEFAULT 0
    )
  `);

  // Create the Product table
db.run(`CREATE TABLE IF NOT EXISTS Product (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  quantity INTEGER NOT NULL,
  price REAL NOT NULL
)`);


module.exports = db;
