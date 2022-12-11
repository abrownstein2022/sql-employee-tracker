  //This file handles 
  //added "type": "module" to package.json
  //removed type: module since doing es5 not es6
  //need async in case need to wait to complete something
  //import {getRoles,getRoleIdByTitle,getEmpIdByName,modifyDbFromQuery, validateInput, getEmployees } from "./utils.js";
  //import inquirer from "inquirer";
  //only use export in front of function if using import which is es6

const {getRoles,getRoleIdByTitle,getEmpIdByName,modifyDbFromQuery, validateInput, getEmployees, getDepartments } = require("./utils.js");
const inquirer = require("inquirer");

//showMainMenu is a function we're passing to go directly to the main menu after running this menu item
const addRole = async (showMainMenu) => {
  //  console.log("adding role");

    let dept = await getDepartments()

    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter title:',
        validate: validateInput("title")  
      }, 
      {
        type: 'input',
        name: 'salary',
        message: 'Enter role salary:',
        validate: validateInput("role salary")  
      },
      //use this logic to do departments list
      // {   //... is spread operator - spreads out any iterable element
      //   type: 'list',
      //   name: 'role',
      //   choices: roles,
      //   message: 'Please select role:'
      // }, 
      {  //need to validate number value in addition to not empty
        type: 'list',
        name: 'departmentid',
        message: 'Enter department Id:',   
        choices: dept,
        validate: validateInput("department Id")  
      }
  
    ]
    )
    .then(async (answers) => {
        console.log('new role details:', answers);
        //insert into employee table
        //first need to get role id for role(title) selected
        //console.log(answers.role);
        //need to handle the promise return.  Use promise all below to get all values at once and set id values after
        //use this for department dropdown
        //  let roleIdValue = await getRoleIdByTitle(answers.role);
          // console.log({
          //   roleIdValue,
          //   empIdValue
          // })
          let sql = "insert into role (title, salary, department_id) values('" + answers.title + "','" + answers.salary + "'," + answers.departmentid + ")";
          //console.log(sql);  

          //now do insert statement
          // let sql = 'select * from employee;'
          modifyDbFromQuery(sql);
          // console.log('database modified ??')
    })
    .catch(err => {
      console.log('There was an error adding a role:', err)
    })
    //finally is always run after thens and catch no matter what the result is (if errors or no errors)
    .finally(() => {
      //console.log('inquirer done?')
      showMainMenu();
    })

  
  }
  
module.exports = addRole;