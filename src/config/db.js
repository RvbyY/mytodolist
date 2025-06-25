const mysql = require('mysql2');
const dotenv = require("dotenv");
dotenv.config()

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    // TODO REMOVE THIS LINE WHEN PUSHING
});

db.connect((err) => {
    if (err) console.error('DB connection failed', err);
    else console.log('Connected to MySQL !');
});

module.exports = db;