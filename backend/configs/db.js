const mysql = require('mysql2')
require('dotenv').config()
const db = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
}
const connection = mysql.createConnection(db)
module.exports = connection
