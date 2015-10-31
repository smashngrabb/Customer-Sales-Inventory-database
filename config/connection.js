var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user     : 'admin',
    password : 'password',
    database : 'database_name',
    dateStrings: 'date'
});

module.exports = pool;