var mysql = require('mysql');
//var connection = mysql.createConnection({
//    host     : 'mysqldb.csjw86fvktqz.us-west-2.rds.amazonaws.com',
//    user     : 'root',
//    password : 'n829530123',
//    database : 'todos'
//});

var pool = mysql.createPool({
    host     : 'mysqldb.csjw86fvktqz.us-west-2.rds.amazonaws.com',
    user     : 'root',
    password : 'n829530123',
    database : 'todos'
});

module.exports =  pool;