require("dotenv").config();
const mysql = require("mysql2");

//create mysql connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectTimeout: 90000,
});

//check mysql connection for an error
connection.connect(function (err) {
  if (err) {
    if (err.code === "ECONNREFUSED") {
      throw "Connection to Database Error!!!";
    } else {
      throw err.message;
    }
  }
});

module.exports = connection;
