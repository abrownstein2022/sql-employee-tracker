  //added "type": "module" to package.json
  //need async in case need to wait to complete something
  export async function addEmployee(){
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
      // {  //need to validate number value in addition to not empty
      //   type: 'input',
      //   name: 'salary',
      //   message: 'Enter salary:',   
      //   validate: validateInput("salary")  
      // },
      {  //manager is from employees table
        type: 'list',
        name: 'manager',
        choices: await getEmployees(),  
        message: 'Please select Manager'
      } 
  
    ]
    )
    .then(async function (answers) {
        console.log(answers);
        //insert into employee table
        //first need to get role id for role(title) selected
        //console.log(answers.role);
        //need to handle the promise return.  Use promise all below to get all values at once and set id values after
          let roleIdValue = await getRoleById(answers.role);
          let empIdValue = await getEmpIdByName(answers.manager);
          let sql = "insert into employee (first_name, last_name, role_id, manager_id) values('" + answers.firstname + "','" + answers.lastname + "'," + roleIdValue + "," + empIdValue + ")";
          //console.log(sql);  
          //now do insert statement
          modifyDbFromQuery(sql);
    });
  
  }
  
