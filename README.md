# Challenge Module 12: Employee Tracker Application using Node.js, Inquirer, and MySQL

![license](https://img.shields.io/badge/license-MIT-black)

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Features](#features)
- [How-to-Contribute](#how-to-contribute)
- [Tests](#test-instructions)
- [Questions](#questions)

## Description
The task for this assignment was to build a command-line application to manage a company's employee database using Node.js, Inquirer, and MySQL as the database backend.  
These interfaces are called content management systems (CMS).

**User Story**

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

```

**Acceptance Criteria**

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

```

## Installation
<!-- audience is other developers -->

1. Clone this GitHub repo https://github.com/abrownstein2022/ch11-express-note-taker:
<!-- Check out the gh cli tool from github -->
```bash
$ gh repo clone /abrownstein2022/ch11-express-note-taker
```
2. From the terminal, install npm and uuid:

```bash
$ npm install
$ npm uuid
```

<!-- [] implies user input 
 mysql> restaurant_mgr < C:\[filename].sql
-->

3. Start the local server and watch for file changes to automatically restart server:
```bash
$ npm run watch 
```

4. Open Express or a browser to test any changes you make to the application after cloning.

## Usage

```md
1. Open the app using Express or Heroku (https://ch11-express-notes-taker.herokuapp.com)
2. From the landing page, click on the notes page to see a page with existing notes on the left-hand column, plus empty fields
to enter a new note title and text.
3. Press the Save icon to save this info and see it in the left-hand column.
4. When you click on the Write icon in the top navigation, I see empty fields to enter a new note title and text. 
5. Press the Delete icon to delete a note.

**Please review to the screenshots below to view the application:**
```
![example image welcome page with login and register links](./public/images/welcome-page.jpg)

![example image login page](./public/images/login-page.jpg)

![example image register page](./public/images/register-page.jpg)


## Credits

```md
Alexis Brownstein, bootcamp tutor: Phil and Wyzant tutor: Mike
```

## License

 ```md
 MIT 
```

Link to license text:
https://opensource.org/licenses/mit-license


![badge](https://img.shields.io/badge/license-mit-black)


## Features

<!-- 
# h1
###### h6
**bold**
*italic*
_underline_

| key | value |
|-|-|
| name | 'bob' |


- list
- items

1. numberd
1. list
1. all ones - auttomatic numbering
Feattures for *future* development
 -->
**The main features in this project are:**<br>
1. Uses Express.js and uuid
1. Deployed on Heroku
1. GET, POST and DELETE routes for retrieving, adding and deleteing note data
1. Dates-fns to format the order date in vieworder.handlebars (https://date-fns.org/)
1. Necessary folder structure 
1. Professional README

## How-to-Contribute

N/A

## Test Instructions

N/A

## Questions

Feel free to contact me with any questions.

I can be reached at alexis@drdatabase.com.

This GitHub repo can be found at:
  
https://github.com/abrownstein2022/ch11-express-note-taker
 

