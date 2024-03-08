const mysql = require('mysql')

const db = mysql.createConnection({
    host:'localhost',
    port: '3307',
    user:'root',
    password:'1234',
    database:'kaoyan'
})
module.exports =db;