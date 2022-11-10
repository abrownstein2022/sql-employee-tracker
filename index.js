// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
//const PORT = process.env.PORT || 3001;
require('dotenv').config();
//process. below is an object we can access in JS that is from env
//can also override env file values for current process only using terminal commands stdout, stdin, stderr
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
  //calling break says don't go to next case, only do this one but only needed if not using return
  //and using return is preferred method
  function runLogicFromMenu(menuoption) {    
    switch(menuoption){
      case 'View All Employees': return viewAllEmployees(); 
      case 'Add Employee': return addEmployee();
      case 'Add Employee Role': return addEmployeeRole();
      case 'View All Roles': return viewAllRoles();
      case 'Add Role': return addRole();
      case 'View All Departments': return viewAllDepartments();
      case 'Add Department': return addDepartment();
      case 'Update Employee Managers': return updateEmployeeManagers();
      case 'View Employees By Manager': return viewEmployeesByManager();
      case 'View Employees By Department': return viewEmployeesByDepartment();
      case 'Delete Departments': return deleteDepartments();
      case 'Delete Roles': return deleteRoles();
      case 'Delete Employees': return deleteEmployees();
      case 'View Total Utilized Budget (Combined Salaries)of a Department': return viewTotalBudget();
      default:  return init(); //redo the menu if for some reason, this switch has an issue but should never get here.
    }
    }
//could use callback but we're going to use a named function.  need to have something done first.  Passing function.
// function viewAllEmployee(){
//   db.query('Select * from employee', function (err, results) {
//     console.log(results);
//   });

//use named function, passing entire function to db.query.  After db.query runs the query, will invoke onQueryComplete
function viewAllEmployees(){
  //need to have this function inside due to scope
  function onQueryComplete(err, results) {
     //guard blocks
     if (err) {return};  //don't need else or curly brackets here 
     console.log(results);
  }
  //need db.query after onQueryComplete so it's already defined before db.query executes
  db.query('Select * from employee;',onQueryComplete);  //invoked by mysql2 - either err or results
};


  
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

//JS evaluates from top to bottom so that's why init is at the bottom so all functions are already defined.
// Function call to initialize app
init();