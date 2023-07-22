const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Create a new SQLite database instance
const dbPath = path.resolve(__dirname, "../data/store.sqlite3");
const db = new sqlite3.Database(dbPath);

// Create the User table
db.run(`CREATE TABLE IF NOT EXISTS User (
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
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category UUID REFERENCES Category (id),
    quantity INT,
    price DECIMAL(10, 2)
  )
`);

db.run(`CREATE TABLE IF NOT EXISTS Category (
    id TEXT PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL
  )
`);

module.exports = db;
