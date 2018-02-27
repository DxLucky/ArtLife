//"use strict";
const mysql = require("mysql");
exports.connect = function(sql,param,callback){
    var db = mysql.createConnection({
        host:"localhost",
        port:"3306",
        user:"root",
        password:"root",
        database:"ArtLife"
    });
    db.connect();
    db.query(sql,param,callback);
    db.end();
};