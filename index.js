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
                departments.viewAll();
                break;
            case 'View All Roles':
                roles.viewAll();
                break;
            case 'View All Employees':
                employees.viewAll();
                break;
            case 'Add Department':
                inquirer.prompt({
                    type: 'text',
                    name: 'name',
                    message: "What is the department's name?"
                }).then(({ name }) => {
                    departments.add([name]);
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
                    roles.add([title, salary, department_id]);
                });               
                break;
            case 'Add Employee':

                break;
            case 'Update Employee Role':
                
                break;
        }
    });
    // promptUser();
};

begin();