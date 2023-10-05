const mysql = require('mysql2');

try{
    module.exports = mysql.createConnection({
        host: process.env.MYSQLHOST,
        user: process.env.MYSQLUSER,
        password: process.env.MYSQLPASSWORD,
        port: process.env.MYSQLPORT,
        database: process.env.MYSQLDATABASE
    });
}catch (e) {
    console.log(e);
}