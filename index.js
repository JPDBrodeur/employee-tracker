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
        
                break;
            case 'View All Roles':

                break;
            case 'View All Employees':
                const sql = `SELECT
                employees.id,
                employees.first_name,
                employees.last_name,
                roles.title,
                departments.name AS department,
                roles.salary,
                CONCAT(managers.first_name, ' ', managers.last_name) AS manager
                FROM employees
                LEFT JOIN roles ON employees.role_id = roles.id
                LEFT JOIN departments ON roles.department_id = departments.id
                LEFT JOIN employees as managers ON employees.manager_id = managers.id;`           
                db.promise().query(sql, (err, res) => {
                    if (err) throw err;
                    console.table(res);
                });
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