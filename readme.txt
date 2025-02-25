buatlah database dengan nama laterna ,buat tabel user
Tabel User
name type length default null index AI (Auto Increment)
id_user int 50 none no PRIMARY yes
email varchar 100 none no -- no
password varchar 255 none no -- no
role varchar 25 none
created_at datetime 255 current_timestap no -- no
updated_at datetime 255 current_timestap no -- no

1.init project node : npm init -y
2.Instal basic npm package : npm i express cors dotenv body-parser mysql2
3.Buat file index.js di root project lalu isi dengan:
// require("dotenv").config();
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const { PORT } = process.env;

// const app = express();
// const server = require("http").createServer(app);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(cors());

// server.listen(PORT || 8000, () => {
// console.log(`Backend running on port ${PORT || 8000}`);
// });
4.Test running project, ketik di terminal : nodemon



#Setup Database connection #

buat file .env di root folder lalu isi dengan:
pastikan nama database, host database, dan user database
#Server PORT
PORT= 8000

#Database environment
DB_HOST = localhost
DB_USER = root
DB_PASSWORD =
DB_DATABASE = laterna

2.buat folder src > helpers kemudian buat file db.js didalam folder helpers, lalu isi dengan
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


untuk test user di postman menggunakan metode get : http://localhost:8000/user

git remote add origin [https://github.com/edoananda09/laterna.git].git
