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

// Create the Project table
db.run(`
  CREATE TABLE IF NOT EXISTS Project (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User (id)
  )
`);

// Create the Skill table
db.run(`
  CREATE TABLE IF NOT EXISTS Skill (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    experience_level TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User (id)
  )
`);

// Create the Education table
db.run(`
  CREATE TABLE IF NOT EXISTS Education (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    major TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User (id)
  )
`);

module.exports = db;
