//This file handles
//added "type": "module" to package.json
//removed type: module since doing es5 not es6
//need async in case need to wait to complete something
//import {getRoles,getRoleIdByTitle,getEmpIdByName,modifyDbFromQuery, validateInput, getEmployees } from "./utils.js";
//import inquirer from "inquirer";
//only use export in front of function if using import which is es6

const db = require("../config/connection.js");
const {
  getRoles,
  getRoleIdByTitle,
  getEmpIdByName,
  modifyDbFromQuery,
  validateInput,
  getEmployees,
} = require("./utils.js");
const inquirer = require("inquirer");

const addEmployee = async (showMainMenu) => {
  // console.log("adding employee");
  //  arrow function below is short-hand if/then/else
  let rolechoices = db.query(
    "select title from role;",
    (err, results) => !err && results
  );

  //process.exit(); //stops processing
  let roles = await getRoles();
  let emps = await getEmployees();
  //console.log('roles???:', roles)

  // const roleChoices = role.map(({ id, title }) => ({
  //   //displays the title but stores the id so we can insert into employee table correctly with ids
  //     name: title,
  //     value: id
  //     }));

  //  inquirer.prompt({
  //     type: "list",
  //     name: "roleId",
  //     message: "What is the employee's role?",
  //     choices: roleChoices
  //     })
  // .then(res => {
  //     let roleId = res.roleId;
  // })

  inquirer
    .prompt([
      {
        type: "input",
        name: "firstname",
        message: "Enter employee first name:",
        validate: validateInput("employee first name"),
      },
      {
        type: "input",
        name: "lastname",
        message: "Enter employee last name:",
        validate: validateInput("employee last name"),
      },
      {
        type: "list",
        name: "role",
        message: "Select role:",
        choices: roles,
      },
      {
        //manager is from employees table
        type: "list",
        name: "manager",
        message: "Select manager:",
        choices: emps,
      },
    ])
    .then(async (answers) => {
      //console.log('new employee details:', answers);
      //insert into employee table
      //first need to get role id for role(title) selected
      //console.log(answers.role);
      //need to handle the promise return.  Use promise all below to get all values at once and set id values after
      // let roleIdValue = await getRoleIdByTitle(answers.role);
      // let empIdValue = await getEmpIdByName(answers.manager);
      // console.log({
      // roleIdValue,
      // empIdValue
      // })
      //  console.log('manger selected:', answers.manager)
      // console.log('role selected:', answers.role)
      let sql =
        "insert into employee (first_name, last_name, role_id, manager_id) values('" +
        answers.firstname +
        "','" +
        answers.lastname +
        "'," +
        answers.role +
        "," +
        answers.manager +
        ")";
      //console.log(sql);
      //now do insert statement
      // let sql = 'select * from employee;'
      modifyDbFromQuery(sql);
      // console.log('database modified ??')
    })
    .catch((err) => {
      console.log("There was an error adding an employee:", err);
    })
    .finally(() => {
      //console.log('inquirer done?')
      showMainMenu();
    });
};

//~////////////////////////////////////////////////////////////////////

// const addEmp = async (showMainMenu) => {
//   // initialize as empty array - so if no results - no error thrown by empty or undefined array
//   let roleChoices = []
//   let mgrChoices = []
//   try{
//     const roles = []

//     db.query("SELECT * FROM roles", function (err, result, fields) {
//       if (err) throw err;
//       console.log(result);
//       // I THINK - the function has to return a value, in order to assign it to 'roles'
//       roles = result
//     })

//     roleChoices = roles.map(({ id, title }) => ({
//       //displays the title but stores the id so we can insert into employee table correctly with id
//       name: title,
//       value: id
//     }));
//     console.log('role choices:', roleChoices)

//     const managers = []
//     db.query("SELECT * FROM employee", function (err, result, fields) {
//       if (err) throw err;
//       console.log(result);
//       managers = result
//     })

//     mgrChoices = managers.map(({ id, first_name, last_name }) => ({
//           //displays the first and last name but stores the id so we can insert into employee table correctly with id
//             fname:  first_name,
//             lname: last_name,
//             value: id
//     }));
//     console.log('mgr choices:', mgrChoices)

//   }catch(err){
//     console.log('db query error?:', err)
//   }finally{

//     console.log('prompting user for input')

//     let answers = await inquirer.prompt([
//     {
//       type: "input",
//       name: "firstname",
//       message: "Enter employee's first name:",
//       validate: validateInput("employee first name")
//     },
//     {
//       type: "input",
//       name: "lastname",
//       message: "Enter employee's last name:",
//       validate: validateInput("employee last name")
//     },
//     {
//       type: "list",
//       name: "roleId",
//       message: "What is the employee's role?",
//       choices: roleChoices
//     },
//     {
//         type: "list",
//         name: "mgrid",
//         message: "Who is the employee's manager?",
//         choices: mgrChoices
//       }
//     ])
//     console.log('answers:', answers)
//     // .then(res => {
//     //   console.log('Then?')
//     //   let lastName = res.lastname;
//     //   let firstName = res.firstname;
//     //   let roleChoice = res.roleId.value;
//     //   const ret = {
//     //     firstName,
//     //     lastName,
//     //     roleChoice,
//     //   }
//     //   console.log(ret)
//     //   showMainMenu()
//     // })
//     // .catch(err => console.log('inquirer prompt error:', err))
//     // .finally(() => {
//     //   console.log('finally?')
//     //   showMainMenu()
//     // })
//   }

// }

module.exports = addEmployee;
