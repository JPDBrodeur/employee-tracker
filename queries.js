const db = require('./db/connection');
const promptUser = require('./index')

class Table {
    constructor(sqlQuery, sqlPost) {
        this.sqlQuery = sqlQuery;
        this.sqlPost = sqlPost;
    }

    viewAll() {
        return db.promise().query(this.sqlQuery)
            .then( ([rows, fields]) => {
                console.log('');
                return console.table(rows);
            })
            .catch(console.log);
    }

    add(params) {
        return db.promise().query(this.sqlPost, params)
            .then( ([rows, fields]) => {
                console.log('');
                console.log(`${params[0]} was successfully added.`)
                console.log('');
            })

            .catch(console.log);
    }
}

class EmployeesTable extends Table {
    constructor(sqlQuery, sqlPost) {
        super(sqlQuery, sqlPost);
    }

    getNames() {
        return db.promise().query(this.sqlQuery)
            .then( ([rows, fields]) => {
                let employeeNames = rows.map(employee => ({
                    name: employee.first_name + ' ' + employee.last_name,
                    value: employee.id
                }))
                return employeeNames;
            })
    };
};


const departments = new Table(`SELECT
    departments.name,
    departments.id
    FROM departments;`,
    `INSERT INTO departments (name) VALUES (?)`);

const roles = new Table(`SELECT
    roles.title AS 'job title',
    roles.id,
    departments.name AS department,
    roles.salary
    FROM roles
    LEFT JOIN departments ON roles.department_id = departments.id;`,
    `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`);

const employees = new EmployeesTable(`SELECT
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
    LEFT JOIN employees as managers ON employees.manager_id = managers.id;`,
    `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`);

module.exports = { departments, roles, employees };