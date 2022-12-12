//This file contains all utlity functions - return values used in other files
//if ES6 need to put export before each function in include file so always available to use in other files

// import db from "../config/connection.js";
const db = require("../config/connection.js");
const showMainMenu = require("./index.js");

async function getRoleIdByTitle(title) {
  return new Promise((res)=>{

    console.log('getting role id by title:', title)
    // let data = 
    db.query("select id from role where title ='" + title + "'", (err, data) => {
      err ? res(err) : res(data[0].id)
    });
  })
  // console.log('returning data:', data)
  //console.log(response[0].id);
  //return (await db.query("select id from role where title ='" + title + "'")).id
  // return data.value;
}
async function getEmpIdByName(name) {
  return new Promise((res)=>{
  //can be used to get mrg id or emp id because employees can be managers and stored in same table
  db.query(
    "select id from employee where concat(first_name,' ',last_name) ='" +
      name +
      "'"
      ,(err, data) => {
        if(err){
          console.log(err)
          res(err)
        }
        res(data[0].id)
      }
  );
  })
}
//use one function to validate user input to questions below
function validateInput(message) {
  return function (answer) {
    if (answer.length < 1) {
      return console.log(`Please enter ${message}!`);
    }
    return true;
  };
}
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
// export function renderTableFromQuery(sqlquery){ //passes sql code
//     //need to have this function below inside due to scope
//     function onQueryComplete(err, results) {
//        //guard blocks
//        if (err){console.log("No results found!"); return};  //don't need else or curly brackets here
//        console.table(results);  //console.table displays the results in a pretty table!
//     }
//     //need db.query after onQueryComplete so it's already defined before db.query executes
//     db.query(sqlquery,onQueryComplete);  //db.query invoked by mysql2 - either err or results
//   };

//not using promises any longer here: promise must return something so return console.table(results)

//alexis 12/11/22 remove showMainMenu b/c it refreshes the entire screen so lose menu value just selected
 async function renderTableFromQuery(sqlquery, showMainMenu,menuselectedtext) {
  //passes sql code
  //console.log(sqlquery);
  //need db.query after onQueryComplete so it's already defined before db.query executes
  // clear the console before each table
   //console.clear()
   db.query(sqlquery, (err, data, fields) => {
    if(err){
      console.log(err)
    }

   console.log(menuselectedtext); //alexis 12/11/22
   console.table(data);
   showMainMenu();
  }); 


  //db.query invoked by mysql2 - either err or results
  //console.log(results);   //return object called results from http - we want to see data value/key inside the object results
  //if (!results.length){console.log("No results found!"); return};  //don't need else or curly brackets here
  // return console.table(data);
}

//use try catch with async
function modifyDbFromQuery(sqlquery) {
  try{
    console.log("Modifying database...")
    db.query(sqlquery, (err) => {
      err && console.log(err)
    });
    console.log("Database modified successfully!");
  }catch(err){
    console.log('error modifying db:', err)
  }
}

//only need async if function uses await
//works with await below - don't use callback if using async / await
//promise so now have to handle promise
function getRoles() {
  return new Promise(res => {

    // console.log('getting roles list')
    // let rolechoices = [];  //just declared and not defined
    //destructure results so only get 1st element in this case since it's an array
    db.query("select title, id from role;", (err, data) => {
      if(err || !data.length) {
        console.log('error getting roles:', err)
        res(['error-getting-roles'])
      } 
      
      //console.log('data:', data)
      // console.log('got titles:', titles)
      // res(data.map((role) => role.title)) //map takes an array and returns a new array.  give callback function to every time in the array.
      res( data.map((role) => ({ name: role.title, value: role.id }) ))
    });
    //pauses and waits
    // console.log(rows);  //it's an array
    // process.exit(); //don't clear terminal
    //arrow function have an implicit return- below role.title is returned
  })

}

async function getEmployees() {
  return new Promise(res => {
  //destructure results so only get 1st element in this case since it's an array
  db.query(
    "select concat(first_name,' ',last_name) as full_name, id from employee order by last_name, first_name;",
    (err, data) => {
      //map takes an array and returns a new array.  give callback function to every time in the array.
      err ? res([]) : res( data.map((emp) => ({ name: emp.full_name, value: emp.id}) ))
      // err ? res([]) : res( data.map((emp) => `${emp.id}:${emp.full_name}` ))
    }
  ); 
  })
  //pauses and waits
  // console.log(rows);  //it's an array
  // process.exit(); //don't clear terminal
  //arrow function have an implicit return- below role.title is returned
}

function getDepartments() {
  return new Promise(res => {

    // console.log('getting roles list')
    // let rolechoices = [];  //just declared and not defined
    //destructure results so only get 1st element in this case since it's an array
    db.query("select name, id from department order by name;", (err, data) => {
      if(err || !data.length) {
        console.log('Error getting roles:', err)
        res(['error-getting-depts'])
      } 
      
     // console.log('data:', data)
      // console.log('got titles:', titles)
      // res(data.map((role) => role.title)) //map takes an array and returns a new array.  give callback function to every time in the array.
      res( data.map((x) => ({ name: x.name, value: x.id }) ))
    });
    //pauses and waits
    // console.log(rows);  //it's an array
    // process.exit(); //don't clear terminal
    //arrow function have an implicit return- below role.title is returned
  })

}

module.exports = {
  getRoleIdByTitle,
  getEmpIdByName,
  validateInput,
  renderTableFromQuery,
  modifyDbFromQuery,
  getRoles,
  getEmployees,
  getDepartments
};
