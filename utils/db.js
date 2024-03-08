const mysql = require('mysql')

const db = mysql.createConnection({
    host:'47.115.216.143',
    port: '3306',
    user:'admin',
    password:'1234',
    database:'kaoyan'
})
module.exports =db;
