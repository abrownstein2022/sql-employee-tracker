  //This file handles 
  //added "type": "module" to package.json
  //12/6/22 removed type: module since doing es5 not es6
  //need async in case need to wait to complete something
  //import {getRoles,getRoleIdByTitle,getEmpIdByName,modifyDbFromQuery, validateInput, getEmployees } from "./utils.js";
  //import inquirer from "inquirer";
  //only use export in front of function if using import which is es6

const {getRoles,getRoleIdByTitle,getEmpIdByName,modifyDbFromQuery, validateInput, getEmployees } = require("./utils.js");
const inquirer = require("inquirer");

//showMainMenu is a function we're passing to go directly to the main menu after running this menu item
const addDept = async (showMainMenu) => {
    console.log("adding dept");

    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter department name:',
        validate: validateInput("name")  
      }
    ]
    )
    .then(async (answers) => {
        console.log('new department details:', answers);
        let sql = "insert into department (name) values('" + answers.name + "')";
        //use function below to execute sql code
          modifyDbFromQuery(sql);
    })
    .catch(err => {
      console.log('There was an error adding a department:', err)
    })
    //finally is always run after thens and catch no matter what the result is (if errors or no errors)
    .finally(() => {
      console.log('inquirer done?')
      showMainMenu();
    })

  
  }
  
module.exports = addDept;