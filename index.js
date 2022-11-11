// Import and require mysql2
//had to change require to import due to using module in package.json
//changed from mysql = etc
import mysql from 'mysql2/promise';  //return promise - now all mysql will return promise - make sure everything is waiting if it needs to
import inquirer from 'inquirer';
//const PORT = process.env.PORT || 3001;
import dotenv from 'dotenv';
dotenv.config();  //goes with line above

//process. below is an object we can access in JS that is from env
//can also override env file values for current process only using terminal commands stdout, stdin, stderr
// Connect to database - use .env file values
const db = await mysql.createConnection(
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

   
//could use callback but we're going to use a named function.  need to have something done first.  Passing function.
// function viewAllEmployee(){
//   db.query('Select * from employee', function (err, results) {
//     console.log(results);
//   });

//use named function, passing entire function to db.query.  After db.query runs the query, will invoke onQueryComplete
// function viewAllEmployees(){  replaced by reusable function renderTableFromQuery below
//   //need to have this function inside due to scope
//   function onQueryComplete(err, results) {
//      //guard blocks
//      if (err) {return};  //don't need else or curly brackets here 
//      console.table(results);  //console.table displays the results in a pretty table!
//   }
//   //need db.query after onQueryComplete so it's already defined before db.query executes
//   db.query('Select * from employee;',onQueryComplete);  //invoked by mysql2 - either err or results
// };

// do /**  */ called JSDoc below to attach comments to the following function.  Roll over the function to see the comments.  Can also be multi-line.
/** hello world
 * @param sqlquery string this is the sql string for the query
 */
function renderTableFromQuery(sqlquery){ //passes sql code
  //need to have this function below inside due to scope
  function onQueryComplete(err, results) {
     //guard blocks
     if (err){console.log("No results found!"); return};  //don't need else or curly brackets here 
     console.table(results);  //console.table displays the results in a pretty table!
  }
  //need db.query after onQueryComplete so it's already defined before db.query executes
  db.query(sqlquery,onQueryComplete);  //db.query invoked by mysql2 - either err or results
};

function modifyDbFromQuery(sqlquery){
 function onQueryComplete(err, results){
    if (err){console.log(err); return};
    console.log("Database modified successfully!");
  }
  db.query(sqlquery,onQueryComplete);

}
//works with await below - don't use callback if using async / await
//promise so now have to handle promise
async function getRoles(){
 // let rolechoices = [];  //just declared and not defined
  //destructure results so only get 1st element in this case since it's an array  
  let [rows] = await db.query("select title from role;");
   //pauses and waits
  // console.log(rows);  //it's an array 
  // process.exit(); //don't clear terminal
  //arrow function have an implicit return- below role.title is returned
  return rows.map(role => role.title);  //map takes an array and returns a new array.  give callback function to every time in the array.
}

async function getEmployees(){
  //destructure results so only get 1st element in this case since it's an array  
  let [rows] = await db.query("select concat(first_name,' ',last_name) as Employee_Name from employee;");
   //pauses and waits
  // console.log(rows);  //it's an array 
  // process.exit(); //don't clear terminal
  //arrow function have an implicit return- below role.title is returned
  return rows.map(emp => emp.Employee_Name);  //map takes an array and returns a new array.  give callback function to every time in the array.
}

//added "type": "module" to package.json
//need async in case need to wait to complete something
async function addEmployee(){
  console.log("adding employee");
//arrow function below is short-hand if/then/else
// let rolechoices = db.query("select title from role;",(err, results)=> !err && results);
  let rolechoices = getRoles();  //get roles from function 

//process.exit(); //stops processing
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstname',
      message: 'Enter employee first name:',
      validate: validateInput("employee first name")  
    }, 
    {
      type: 'input',
      name: 'lastname',
      message: 'Enter employee last name:',
      validate: validateInput("employee last name")  
    },
    {   //... is spread operator - spreads out any iterable element
      type: 'list',
      name: 'role',
      choices: await getRoles(),
      message: 'Please select role:'
    }, 
    {  //need to validate number value in addition to not empty
      type: 'input',
      name: 'salary',
      message: 'Enter salary:',   
      validate: validateInput("salary")  
    },
    {  //manager is from employees table
      type: 'list',
      name: 'manager',
      choices: await getEmployees(),  
      message: 'Please select Manager'
    } 

  ]
  )
  .then(function (answers) {
      console.log(answers);
      //insert into employee table
      //first need to get role id for role(title) selected
      let roleid = db.query("select id from role where title ='" + answers.role + "'");
      let empid = db.query("select id from employee where concat(first_name,' ',last_name) ='" + answers.manager + "'");
      console.log(roleid);
      console.log(empid);
      //now do insert statement
      let sql = "insert into employee (first_name, last_name, role_id, manager_id) values('" + answers.firstname + "','" + answers.lastname + "'," + roleid + "," + empid;
      console.log(sql);
      //db.query(sql, onQueryComplete);

  });

}

  //calling break says don't go to next case, only do this one but only needed if not using return
  //and using return is preferred method
  //answers 
  function runLogicFromMenu(answers) {    //2 key value pairs tuples {q1:a1,q2:a2} answers:questions. menuoptions is the name of the questions from line 33
    console.log(answers);
    switch(answers){
      case 'View All Employees': return renderTableFromQuery('Select * from employee;');   ///change logic to join all tables and display like the example and do alias for col headings
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
  
// TODO: Create a function to initialize app
//date.now() means today's date.  Output this way to get unique test file each time.  Will change once project is complete.
//writeToFile("README" + Date.now() + ".md", generateMarkdown(userInput));
function init() {
  console.clear()  //clear whatever is on terminal
  inquirer.prompt(menu)
  .then(function (answers) {
      console.log(answers)
      runLogicFromMenu(answers.menuoptions);//return value in object so we don't have to play with the obj any longer
     // writeToFile("README.md", generateMarkdown(userInput));
  });
};

//JS evaluates from top to bottom so that's why init is at the bottom so all functions are already defined.
// Function call to initialize app
init();