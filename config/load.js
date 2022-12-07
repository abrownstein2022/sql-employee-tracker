//"npm run load" from terminal looks at script object in package.json for values next to load 
const db = require('./connection.js');
const fs = require('fs');

//12/6/22 alexis changed to import since import used in other files
// import connection from "./connection.js";
// import fs from "fs";
//removed this line   "type": "module", after main, line 5 in package.json so ES5 not es6
//? what is this?
//> sometimes globally available as __dirname (two underscores) - refers to the root path of the running process
const dir = fs.realpathSync(".");

// simple query 
// load schema - reads schema path above
//? what does RegExp do below?
//> RegExp (rejex) is the fastest (and really the best) method for pattern matching strings
//> We are using it here to take advantage of the "g" flag (global) which replaces ALL occurances of the pattern



try{
  console.log(">> Loading schema file into DB...");
  let schema = fs.readFileSync(dir + '/db/schema.sql', {encoding: 'utf-8'});
  // we are using 'mysql2/promise' which always returns a promise - must use await or .then
  db.query(
    // replace all occurances of newline (\r\n) with single space " "
    schema.replace(new RegExp('\r\n',"g")," "), // same as /\r\n/g    /DAS{}]1d23c []e[cw3r[A}{E]/gim 
    function(err, results, fields) {
      console.log(err);
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
    );
  console.log(">> Loaded schema file into DB.");

}catch(err){
  console.log('There was an error submitting schema to db:', err)
}


// simple query
// runs seed data from query line above
try{
  console.log('>> Seeding the DB...')
  let query = fs.readFileSync(dir + '/db/seeds.sql', {encoding: 'utf-8'});
  db.query(
    query.replace(new RegExp('\r\n',"g")," "),
    function(err, results, fields) {
      console.log(err);
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
  console.log('>> Seeded the DB.')

}catch(err){
  console.log('There was an error seeding the db:', err)
}


console.log('DONE!')

