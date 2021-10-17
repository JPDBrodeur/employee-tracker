const inquirer = require('inquirer');
const figlet = require('figlet');
const db = require('./db/connection');

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
});

const promptUser = () => {
    console.log(figlet.textSync(`Employee  
Manager`));

    inquirer.prompt({
        type: 'list',
        name: 'mainMenu',
        message: 'What would you like to do?',
        choices: ['View All Departments',
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
        // 'View Total Utilized Budget of Department',
    ]
    })
    .then(({ mainMenu }) => {
        switch (mainMenu) {
            case 'View All Departments':

                break;
            case 'View All Roles':

                break;
            case 'View All Employees':

                break;
            case 'Add Department':

                break;
            case 'Add Role':

                break;
            case 'Add Employee':

                break;
            case 'Update Employee Role':
                
                break;
        }
    });
};

promptUser();