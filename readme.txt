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

ini branch development





//task-2
1.install npm i jsonwebtoken : untuk create token
2.import jsonwebtoken pada constrollers => const jwt = require("jsonwebtoken");
3.Buatlah 1 function model getUserByEmail
4.Buatlah 1 function controller loginUser,  yg menerima parameter "email"
5.Kemudian gunakan function getUserByEmail di dalam function loginUser, jika data user ditemukan tidak perlu return apa apa, return response "User not found or invalid email!" 
6.Jika data di temukan lanjut bandingkan / compare data user password yg didapatkan dari database dengan password yg diinput user lakukan compare dengan function const comparePassword = await bcrypt.compare("password yg diinput user", "password yg di dapat dari database")
7.Setelah di compare jika hasil nya true, return response "Login success", jika hasil nya false return "Wrong password!"
8.buatlah routes POST "/user/login-user"
9.chek di postman http://localhost:8000/user/login-user /di body isi key email:"" ,dan password:""(untuk mendapatkan )token 
"success": true,
    "message": "login success",
    "results": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imt1bnR1bDExQGdtYWlsLmNvbSIsInVzZXJfaWQiOjMsImlhdCI6MTc0MDcxNDY2NSwiZXhwIjoxNzQwNzE0NzI1fQ.QvHqJm3hy8VFJsAHcykUuUpPDQq3a_7ElgFazZWqCSQ"
    }
10.chek di postman http://localhost:8000/user/check-access-token  /di body key nya accessToken ,isi value token yang di dapat dari login user  (untuk ngchek token masih valid atau tidak)
    "success": true,
    "message": "Token Valid"
route.post("/login-user", userController.loginUser);
route.post("/check-access-token", userController.accessToken);

