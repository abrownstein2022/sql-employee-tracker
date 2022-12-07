// Enable access to .env variables

//moved these lines from index.js so together with connection logic
// import dotenv from "dotenv";
// dotenv.config();
const dotenv = require('dotenv').config();


//change to below------ const mysql = require('mysql2/promise');   //need to use promise here so we can use await
// import mysql from "mysql2/promise";
const mysql = require("mysql2/promise")

// create the connection to database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });
//process. below is an object we can access in JS that is from env
//can also override env file values for current process only using terminal commands stdout, stdin, stderr
// Connect to database - use .env file values
//12/6/22 alexis removed await below due to error 
//SyntaxError: await is only valid in async functions and the top level bodies of modules
//const db = await mysql.createConnection(
  //+ we are using 'mysql2/promise' which always returns a promise - must use await or .then


const createConnection = async () => {
  const db = await mysql.createConnection(
    {
      host: "127.0.0.1",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    console.log(`Connected to the Employee Tracker database.`)
  );
  return db
}



//export default db;  //this allows db to be imported into other files.  Otherwise, it is private.
module.exports = db;
