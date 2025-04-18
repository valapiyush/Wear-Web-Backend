const routes = require("express").Router();
const UserController = require("../controllers/UserController");

// User routes
routes.get("/users",UserController.getAllUsers);
// routes.post("/users",UserController.addUser);
routes.delete("/users/:id",UserController.deleteUserByID);
routes.get("/users/:id",UserController.getUserById);
routes.put("/users/:id",UserController.updateUserById);
routes.post("/users/signup",UserController.signup);
routes.post("/users/login",UserController.loginUser)
routes.post("/users/forgotpassword",UserController.forgotpassword)
routes.post("/users/resetpassword/:token",UserController.resetPassword)

module.exports = routes