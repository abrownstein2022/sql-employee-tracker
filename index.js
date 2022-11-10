// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
//const PORT = process.env.PORT || 3001;
require('dotenv').config();
//Mike - where does process.env come from?***************************************
// Connect to database - use .env file values
const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the Employee Tracker database.`)
  );
  
//use one function to validate user input to questions below
function validateInput(message) {
  return function(answer) {
    if (answer.length < 1) {
        return console.log(`Please enter ${message}!`);
    }
    return true;
   }
}
  
// main menu for user input
const menu = [
  {
    type: 'list',
    name: 'menuoptions',
    choices: ['View All Employees', 'Add Employee', 'Add Employee Role', 'View All Roles', 'Add Role','View All Departments','Add Department','Update Employee Managers','View Employees By Manager','View Employees By Department','Delete Departments','Delete Roles','Delete Employees','View Total Utilized Budget (Combined Salaries)of a Department'],
    default: 'View All Employees',
    message: 'What would you like to do?',
  } 
  ];

  
  function runLogicFromMenu(menuoption) {    
    switch(menuoption){
      case 'View All Employees':
      case 'Add Employee': 
      case 'Add Employee Role':
      case 'View All Roles':
      case 'Add Role':
      case 'View All Departments':
      case 'Add Department':
      case 'Update Employee Managers':
      case 'View Employees By Manager':
      case 'View Employees By Department':
      case 'Delete Departments':
      case 'Delete Roles':
      case 'Delete Employees':
      case 'View Total Utilized Budget (Combined Salaries)of a Department':
      default:  
    }
    }


// TODO: Create a function to initialize app
//date.now() means today's date.  Output this way to get unique test file each time.  Will change once project is complete.
//writeToFile("README" + Date.now() + ".md", generateMarkdown(userInput));
function init() {
  inquirer.prompt(menu)
  .then(function (userInput) {
      console.log(userInput)
      runLogicFromMenu(menu);
     // writeToFile("README.md", generateMarkdown(userInput));
  });
};

// Function call to initialize app
init();