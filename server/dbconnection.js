const mysql = require('mysql');
const connection = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'admin',
    password: 'admin@321654',
    database:'management'
});

module.exports= connection;