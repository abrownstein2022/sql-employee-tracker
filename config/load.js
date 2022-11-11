//"npm run load" from terminal looks at script object in package.json for values next to load 
const connection = require('./connection.js');
const fs = require('fs');
const dir = fs.realpathSync(".");

let schema = fs.readFileSync(dir + '/db/schema.sql', {encoding: 'utf-8'});

// simple query
connection.query(
  schema.replace(new RegExp('\r\n',"g")," "),
  function(err, results, fields) {
    console.log(err);
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);

let query = fs.readFileSync(dir + '/db/seeds.sql', {encoding: 'utf-8'});

// simple query
connection.query(
  query.replace(new RegExp('\r\n',"g")," "),
  function(err, results, fields) {
    console.log(err);
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);