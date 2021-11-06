const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const figlet = require('figlet');
const { departments, roles, employees } = require('./queries');

db.connect(err => {
    if (err) throw err;
});

const begin = () => {
    console.log(figlet.textSync(`Employee
    Manager`));
    console.log('');
    promptUser();
}

const promptUser = () => {

    inquirer.prompt({
        type: 'list',
        name: 'mainMenu',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Update Employee Role',
            'Quit Application'
            // 'Update Employee Manager',
            // 'View All Employees By Manager',
            // 'View All Employees By Department',
            // 'Remove Department',
            // 'Remove Role',
            // 'Remove Employee',
            // 'View Total Utilized Budget of Department'
        ]
    })
    .then(({ mainMenu }) => {
        switch (mainMenu) {
            case 'View All Departments':
                departments.viewAll()
                    .then(() => promptUser());
                break;
            case 'View All Roles':
                roles.viewAll()
                    .then(() => promptUser());
                break;
            case 'View All Employees':
                employees.viewAll()
                    .then(() => promptUser());
                break;
            case 'Add Department':
                inquirer.prompt({
                    type: 'text',
                    name: 'name',
                    message: "What is the department's name?"
                }).then(({ name }) => {
                    departments.add([name])
                        .then(() => promptUser());
                });                        
                break;
            case 'Add Role':
                inquirer.prompt([
                    {
                        type: 'text',
                        name: 'title',
                        message: "What is the job title?"
                    },
                    {
                        type: 'number',
                        name: 'salary',
                        message: 'What is the salary for this position?'
                    },
                    {
                        type: 'number',
                        name: 'department_id',
                        message: "What department id does this role belong to?"
                    }
                ]).then(({ title, salary, department_id }) => {
                    roles.add([title, salary, department_id])
                        .then(() => promptUser());
                });               
                break;
            case 'Add Employee':
                let employeeNames = employees.getNames();
                console.log(employeeNames);
                
                inquirer.prompt([
                    {
                        type: 'text',
                        name: 'first_name',
                        message: "What is the employee's first name?"
                    },
                    {
                        type: 'text',
                        name: 'last_name',
                        message: "What is the employee's last name?"
                    },
                    // {
                    //     type: 'text',
                    //     name: 'title',
                    //     message: "What is this employee's title?",
                    //     choices: []
                    //     // role array
                    // },
                    {
                        type: 'list',
                        name: 'title',
                        message: "Who is this employee's manager?",
                        choices: employeeNames
                    }
                ]).then(() => promptUser()); 
                break;
            case 'Update Employee Role':
                
                break;
            case 'Quit Application':
                db.end();
                break;
        }
    });
};

begin();