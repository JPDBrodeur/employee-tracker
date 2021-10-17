const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const figlet = require('figlet');

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
        // 'View Total Utilized Budget of Department',
    ]
    })
    .then(({ mainMenu }) => {
        switch (mainMenu) {
            case 'View All Departments':
                const sql = `SELECT employees.id,
                employees.first_name,
                employees.last_name,
                roles.title,
                departments.name AS department,
                roles.salary
                FROM employees
                LEFT JOIN roles
                ON employees.role_id = roles.id
                LEFT JOIN departments
                ON roles.department_id = departments.id;`
                // CONCAT(first_name, ' ', last_name) AS manager FROM employees
                // LEFT JOIN employees
                // ON employees.manager_id = employees.id;
                db.promise().query(sql, (err, res) => {
                    if (err) throw err;
                    console.table(res);
                });
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