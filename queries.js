const db = require('./db/connection');

class Database {
    constructor(sqlQuery, sqlPost) {
        this.sqlQuery = sqlQuery;
        this.sqlPost = sqlPost;
    }

    viewAll() {
        db.promise().query(this.sqlQuery)
            .then( ([rows, fields]) => {
                console.log('');
                console.table(rows);
            })
            .catch(console.log)
            .then( () => db.end());
    }

    add(params) {
        db.promise().query(this.sqlPost, params)
            .then( ([rows, fields]) => {
                console.log('');
                console.log(`${params[0]} was successfully added.`)
            })
            .catch(console.log)
            .then( () => db.end());
    }
}

const departments = new Database(`SELECT
    departments.name,
    departments.id
    FROM departments;`,
    `INSERT INTO departments (name) VALUES (?)`);

const roles = new Database(`SELECT
    roles.title AS 'job title',
    roles.id,
    departments.name AS department,
    roles.salary
    FROM roles
    LEFT JOIN departments ON roles.department_id = departments.id;`,
    `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`);

const employees = new Database(`SELECT
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
    LEFT JOIN employees as managers ON employees.manager_id = managers.id;`);

module.exports = { departments, roles, employees };