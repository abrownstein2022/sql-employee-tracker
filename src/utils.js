//need to put export before each function in include file so always available to use in other files

import db from "../config/connection.js";

export async function getRoleIdByTitle(title) {
  let [response] = await db.query("select id from role where title ='" + title + "'");
  //console.log(response[0].id);
  //return (await db.query("select id from role where title ='" + title + "'")).id
   return response[0].id;
}
export async function getEmpIdByName(name) {
  //can be used to get mrg id or emp id because employees can be managers and stored in same table
  let [response] = await db.query(
    "select id from employee where concat(first_name,' ',last_name) ='" + name +    "'");
      console.log(response[0].id);
       return response[0].id;
}
//use one function to validate user input to questions below
export function validateInput(message) {
    return function(answer) {
      if (answer.length < 1) {
          return console.log(`Please enter ${message}!`);
      }
      return true;
     }
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

  //promise must return something so return console.table(results)
  export async function renderTableFromQuery(sqlquery){ //passes sql code
    //console.log(sqlquery);
    //need db.query after onQueryComplete so it's already defined before db.query executes
    let [results] = await db.query(sqlquery);  //db.query invoked by mysql2 - either err or results
    //console.log(results);   //return object called results from http - we want to see data value/key inside the object results
    //if (!results.length){console.log("No results found!"); return};  //don't need else or curly brackets here 
      return console.table(results);
  };
  
  //use try catch with async
export async function modifyDbFromQuery(sqlquery){
 try{
    await db.query(sqlquery);  
    console.log("Database modified successfully!");
  } catch(err){ console.log(err)};

  }

  //only need async if function uses await
  //works with await below - don't use callback if using async / await
  //promise so now have to handle promise
  export async function getRoles(){
   // let rolechoices = [];  //just declared and not defined
    //destructure results so only get 1st element in this case since it's an array  
    let [rows] = await db.query("select title from role;");
     //pauses and waits
    // console.log(rows);  //it's an array 
    // process.exit(); //don't clear terminal
    //arrow function have an implicit return- below role.title is returned
    return rows.map(role => role.title);  //map takes an array and returns a new array.  give callback function to every time in the array.
  }
  
export async function getEmployees(){
    //destructure results so only get 1st element in this case since it's an array  
    let [rows] = await db.query("select concat(first_name,' ',last_name) as Employee_Name from employee;");
     //pauses and waits
    // console.log(rows);  //it's an array 
    // process.exit(); //don't clear terminal
    //arrow function have an implicit return- below role.title is returned
    return rows.map(emp => emp.Employee_Name);  //map takes an array and returns a new array.  give callback function to every time in the array.
  }
  

    