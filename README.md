# Employee Tracker Application using Node.js, Inquirer, and MySQL

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

1. Clone this GitHub repo https://github.com/abrownstein2022/sql-employee-tracker:
<!-- Check out the gh cli tool from github -->
```bash
$ gh repo clone /abrownstein2022/sql-employee-tracker
```

2. From the terminal, install npm, mysql2, inqurier v8.2.4 and npmjs console.table packages:

```bash
$ npm i
$ npm install mysql
$ npm install inquirer@8.2.4
$ npm install console.table --save

```

3. Log into mysql, create the database on your local machine and seed the database:

```bash
$ mysql -u root -p 
mysql> source db/schema.sql
mysql> source db/seeds.sql
```

## Usage

**To start the application, go to the Terminal and enter the line below:**
```bash
$npm start
```
**Then follow the screenshots below:**<br>
![example image 1 main menu](./assets/images/ch12-screen1-mainmenu.jpg)

![example image 2 main menu](./assets/images/ch12-screen2-mainmenu.jpg)

![example image 3 main menu](./assets/images/ch12-screen3-mainmenu.jpg)

![example image 4 view all employees](./assets/images/ch12-screen4-view-all-emp.jpg)

![example image 5 view all roles and departments](./assets/images/ch12-screen5-view-all-roles-depts.jpg)

![example image 6 add employee ](./assets/images/ch12-screen6-add-emp.jpg)

![example image 7 update employee role](./assets/images/ch12-screen7-upd-emp-role.jpg)

![example image 8 add department](./assets/images/ch12-screen8-add-dept.jpg)

![example image 9 add role](./assets/images/ch12-screen9-add-role.jpg)

![example image 10 3 bonus views](./assets/images/ch12-screen10-bonus-views.jpg)

**Please also review the following demonstration video:**

![demo video of how to use this application](./assets/images/ch12-sql-employee-tracker-demo.gif)


## Credits

```md
Alexis Brownstein, Wyzant tutor: Mike
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
1. Uses Node.js, Inquirer, MySQL and npmjs console.table
1. Example screenshots and a demonstration video
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
  
https://github.com/abrownstein2022/sql-employee-tracker
 

