// Import and require mysql2
//had to change require to import due to using module in package.json
//changed from mysql = etc
//import statements must appear before functions and variable definitions - always at the top
import mysql from "mysql2/promise"; //return promise - now all mysql will return promise - make sure everything is waiting if it needs to
import inquirer from "inquirer";
//const PORT = process.env.PORT || 3001;
import dotenv from "dotenv";
import {
  getRoleIdByTitle,
  getEmpIdByName,
  validateInput,
  renderTableFromQuery,
  modifyDbFromQuery,
  getRoles,
  getEmployees,
  addEmployee,
} from "./utils.js"; //separated utils into own file

dotenv.config(); //goes with line above

//process. below is an object we can access in JS that is from env
//can also override env file values for current process only using terminal commands stdout, stdin, stderr
// Connect to database - use .env file values
const db = await mysql.createConnection(
  {
    host: "127.0.0.1",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the Employee Tracker database.`)
);

// main menu for user input
const menu = [
  {
    type: "list",
    name: "menuoptions",
    choices: [
      "View All Employees",
      "Add Employee",
      "Add Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      "Update Employee Managers",
      "View Employees By Manager",
      "View Employees By Department",
      "Delete Departments",
      "Delete Roles",
      "Delete Employees",
      "View Total Utilized Budget (Combined Salaries)of a Department",
    ],
    default: "View All Employees",
    message: "What would you like to do?",
  },
];

//calling break says don't go to next case, only do this one but only needed if not using return
//and using return is preferred method
//answers
function runLogicFromMenu(answers) {
  //2 key value pairs tuples {q1:a1,q2:a2} answers:questions. menuoptions is the name of the questions from line 33
  //console.log(answers);
  switch (answers) {
    case "View All Employees":
      return renderTableFromQuery("Select * from employee;"); ///change logic to join all tables and display like the example and do alias for col headings
    case "Add Employee":
      return addEmployee();
    case "Add Employee Role":
      return addEmployeeRole();
    case "View All Roles":
      return viewAllRoles();
    case "Add Role":
      return addRole();
    case "View All Departments":
      return viewAllDepartments();
    case "Add Department":
      return addDepartment();
    case "Update Employee Managers":
      return updateEmployeeManagers();
    case "View Employees By Manager":
      return viewEmployeesByManager();
    case "View Employees By Department":
      return viewEmployeesByDepartment();
    case "Delete Departments":
      return deleteDepartments();
    case "Delete Roles":
      return deleteRoles();
    case "Delete Employees":
      return deleteEmployees();
    case "View Total Utilized Budget (Combined Salaries)of a Department":
      return viewTotalBudget();
    default:
      return init(); //redo the menu if for some reason, this switch has an issue but should never get here.
  }
}

// TODO: Create a function to initialize app
//date.now() means today's date.  Output this way to get unique test file each time.  Will change once project is complete.
//writeToFile("README" + Date.now() + ".md", generateMarkdown(userInput));
function init() {
  console.clear(); //clear whatever is on terminal
  inquirer.prompt(menu).then(function (answers) {
    console.log(answers);
    runLogicFromMenu(answers.menuoptions); //return value in object so we don't have to play with the obj any longer
    // writeToFile("README.md", generateMarkdown(userInput));
  });
}

//JS evaluates from top to bottom so that's why init is at the bottom so all functions are already defined.
// Function call to initialize app
init();
