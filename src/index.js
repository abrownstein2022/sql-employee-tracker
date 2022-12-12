//this file is the starting point for the application.
//It imports the utility functions from utils.js and sets up the main menu seen by users to use the
//functionality in the application.
// Import and require mysql2 - using ES6 (import)
//had to change require to import due to using module in package.json
//changed from mysql = etc
//import statements must appear before functions and variable definitions - always at the top
// import mysql from "mysql2/promise"; //return promise - now all mysql will return promise - make sure everything is waiting if it needs to
// import inquirer from "inquirer";

// Import and require mysql2
//12/6/22 alexis changed to require es5 not es6
// const mysql = require('mysql2');
const inquirer = require("inquirer");
//https://www.npmjs.com/package/console.table
//package installed npm install console.table --save
//use this package to avoid pitfalls of straight console.log that includes an index column and quote marks around all the values
const cTable = require("console.table");

//const PORT = process.env.PORT || 3001;

const {
  getRoleIdByTitle,
  getEmpIdByName,
  validateInput,
  renderTableFromQuery,
  modifyDbFromQuery,
  getRoles,
  getEmployees,
} = require("./utils.js"); //separated utils into own file

//12/6/22 import addEmployee from "./addEmp.js";

const updEmployeeRole = require("./updEmpRole.js");
const addEmployee = require("./addEmp.js");
const addRole = require("./addRole.js");
const addDept = require("./addDept.js");

// main menu for user input
const menu = [
  {
    type: "list",
    name: "menuoptions",
    choices: [
      "EXIT",
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      //Bonus starting here is not required for this assignment - I'll do extras as I have time
      "View Total Utilized Budget (Combined Salaries) of a Department",
      // "Update Employee Managers",
      "View Employees By Manager",
      "View Employees By Department",
      // "Delete Departments",
      // "Delete Roles",
      // "Delete Employees",
    ],
    default: "View All Employees",
    message: "What would you like to do?",
  },
];

const showMainMenuHeading = () => {
  console.log("|==============================================|");
  console.log("|   ____                                       |");
  console.log("|  |       _   _   _       __        __  __    |");
  console.log("|  |---   | | | | | ) |   |  | |__| |_  |_     |");
  console.log("|  |____  |  V  | |   |__ |__|   |  |__ |__    |");
  console.log("|  __  __                                      |");
  console.log("|  | | | |   _    _    _   ___   ___   _       |");
  console.log("|  |  V  |  (_)  | |  (_)  |  _  |_   |_)      |");
  console.log("|  |     |  | |  | |  | |  |__|  |__  | |      |");
  console.log("|==============================================|");
  showMainMenu();
};

// TODO: Create a function to initialize app
//date.now() means today's date.  Output this way to get unique test file each time.  Will change once project is complete.
//writeToFile("README" + Date.now() + ".md", generateMarkdown(userInput));
function showMainMenu() {
  //console.clear(); //clear whatever is on terminal
  inquirer.prompt(menu).then(function (answers) {
    // console.log(answers);
    runLogicFromMenu(answers.menuoptions); //return value in object so we don't have to play with the obj any longer
    // writeToFile("README.md", generateMarkdown(userInput));
  });
}

//calling break says don't go to next case, only do this one but only needed if not using return
//and using return is preferred method
//answers
let sqlquery = ""; //initialize
let menuselectedtext = ""; //alexis 12/11/22
async function runLogicFromMenu(answers) {
  //2 key value pairs tuples {q1:a1,q2:a2} answers:questions. menuoptions is the name of the questions from line 33
  //console.log(answers);
  //console.clear();
  switch (answers) {
    case "EXIT":
      process.exit(0);
    case "View All Employees":
      // let sqlquery = "select e.id , e.first_name, e.last_name, r.title, d.name as department, r.salary, concat(em.first_name, ' ' , em.last_name) as manager, e.manager_id "
      // " from employee as e" +
      // "left join employee em  " +
      // "on e.manager_id = em.id " +
      // "join role r   " +
      // "on e.role_id = r.id " +
      // "join department d " +
      // "on r.department_id = d.id " +
      // "order by e.id";
      // let sqlquery = "select e.id, e.first_name, e.last_name, r.title, d.name as department, r.salary,  from employee as e join role as r join department as d";
      //use template literal so don't have to use "" and + on each line as I did above
      sqlquery = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, CONCAT(manager.first_name,' ', manager.last_name) AS manager
      FROM employee 
      LEFT JOIN employee manager ON manager.id = employee.manager_id
      INNER JOIN role ON employee.role_id = role.id
      INNER JOIN department ON role.department_id = department.id ORDER BY employee.last_name, employee. first_name;`;
      //console.log ("Viewing all emloyees");
      menuselectedtext = "**View all employees**";
      return renderTableFromQuery(sqlquery, showMainMenu, menuselectedtext); ///change logic to join all tables and display like the example and do alias for col headings
    case "Add Employee":
      menuselectedtext = "**Add employee**";
      return addEmployee(showMainMenu, menuselectedtext);
    case "Update Employee Role":
      // menuselectedtext = "**Update employee role**";  
      return updEmployeeRole(showMainMenu, menuselectedtext);
    case "View All Roles":    
      menuselectedtext = "**View all roles**";
      sqlquery = `SELECT role.id, role.title, role.salary, department.name as department_name from role join department on department.id = role.department_id ORDER BY title;`;
      return renderTableFromQuery(sqlquery, showMainMenu, menuselectedtext);
    case "Add Role":
      return addRole(showMainMenu);
    case "View All Departments":
      menuselectedtext = "**View all departments**";
      sqlquery = `SELECT id, name as department_name from department ORDER BY name;`;
      return renderTableFromQuery(sqlquery, showMainMenu, menuselectedtext);
    case "Add Department":
      return addDept(showMainMenu);
    case "View Employees By Manager":
      menuselectedtext = "**View emloyees by manager**";
      sqlquery = `SELECT  CONCAT(manager.first_name,' ', manager.last_name) AS manager, concat(employee.first_name, ' ', employee.last_name) as employee, role.title, department.name as department, role.salary
      FROM employee 
      LEFT JOIN employee manager ON manager.id = employee.manager_id
      INNER JOIN role ON employee.role_id = role.id
      INNER JOIN department ON role.department_id = department.id
      GROUP BY CONCAT(manager.first_name,' ', manager.last_name), concat(employee.first_name, ' ', employee.last_name), role.title, department.name, role.salary
      ORDER BY CONCAT(manager.first_name,' ', manager.last_name);`;
      return renderTableFromQuery(sqlquery, showMainMenu, menuselectedtext);
    case "View Employees By Department":
      menuselectedtext = "**View all emloyees by department**";
      sqlquery = `SELECT department.name as department, concat(employee.first_name, ' ', employee.last_name) as employee, role.title as employee_title, role.salary, CONCAT(manager.first_name,' ', manager.last_name) AS manager
      FROM employee 
      LEFT JOIN employee manager ON manager.id = employee.manager_id
      INNER JOIN role ON employee.role_id = role.id
      INNER JOIN department ON role.department_id = department.id
      GROUP BY department.name, CONCAT(manager.first_name,' ', manager.last_name), concat(employee.first_name, ' ', employee.last_name), role.title, role.salary
      ORDER BY department.name;`;
      return renderTableFromQuery(sqlquery, showMainMenu, menuselectedtext);
    // case "Delete Departments":
    //   return deleteDepartments();
    // case "Delete Roles":
    //   return deleteRoles();
    // case "Delete Employees":
    //   return deleteEmployees();
    case "View Total Utilized Budget (Combined Salaries) of a Department":
      menuselectedtext ="**View total utilized budget (combined salaries) by department**";
      sqlquery = `SELECT department.name as department_name, 
      CONCAT('$', FORMAT(sum(salary), 0)) as 'combined-salaries-by-dept'
     FROM employee 
     LEFT JOIN employee manager ON manager.id = employee.manager_id
     INNER JOIN role ON employee.role_id = role.id
     INNER JOIN department ON role.department_id = department.id
     GROUP BY department.name
     ORDER BY department.name;`;
      return renderTableFromQuery(sqlquery, showMainMenu, menuselectedtext);
    default:
      return showMainMenu(); //redo the menu if for some reason, this switch has an issue but should never get here.
  }
}

//JS evaluates from top to bottom so that's why init is at the bottom so all functions are already defined.
// Function call to initialize app
//showMainMenu();
//only show the application heading once at the beginning
showMainMenuHeading();
