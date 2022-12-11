//when I choose to update an employee role
//THEN I am prompted to select an employee to update and their new role and this information is updated in the database.
//! github.com/Automatic/cli-table
const {getRoles,getRoleIdByTitle,getEmpIdByName,modifyDbFromQuery, validateInput, getEmployees } = require("./utils.js");
const inquirer = require("inquirer");

//showMainMenu is a function we're passing to go directly to the main menu after running this menu item
const updEmployeeRole = async (showMainMenu) => {
    console.log("updating employee role");


    let emps = await getEmployees()
    let roles = await getRoles()

    inquirer.prompt([
      {
        type: 'list',
        name: 'employee',
        message: 'Select employee to update:',
        choices: emps,
      }, 
      {
        type: 'list',
        name: 'role',
        message: 'Select the new role:',
        choices: roles,
      },
  ])
  .then(async (answers) => {
    // console.log('new role details:', answers);
    let sql = `UPDATE employee SET role_id = ${answers.role} WHERE id = ${answers.employee}`;
    modifyDbFromQuery(sql);
  })
  .catch(err => {
    console.log('There was an error updating the employee role:', err)
  })
  .finally(() => {
    showMainMenu();
  })
}
  
module.exports = updEmployeeRole;