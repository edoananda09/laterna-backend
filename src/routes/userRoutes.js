const route = require("express").Router();
const userController = require("../controllers/user");

route.get("/", userController.getUser);
route.post("/create-user", userController.createUser);
route.post("/login-user", userController.loginUser);
route.delete("/delete-user", userController.deleteUser);

module.exports = route;
