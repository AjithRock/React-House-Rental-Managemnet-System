"use strict";
const mysql = require("mysql");

// Create a connection to the database
const connection = mysql.createConnection({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  charset: "utf8mb4",
  debug: false
});

// Open the MySQL connection
connection.connect(function(err) {
  if (err) throw err;
  console.log("Successfully Connected to the database!");
});

module.exports = connection;
