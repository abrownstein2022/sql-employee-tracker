// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
//const PORT = process.env.PORT || 3001;
require('.env').config();

// Connect to database - use .env file values
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the Employee Tracker database.`)
  );
  
  