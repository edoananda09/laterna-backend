const route = require("express").Router();
const userController = require("../controllers/user");

route.get("/", userController.getUser);
route.get("/:id_user", userController.getUserById);
route.post("/create-user", userController.createUser);
route.delete("/:id_user", userController.deleteUser);

module.exports = route;
