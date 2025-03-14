const routes = require("express").Router()
const userDetailsController = require("../controllers/UserDetailsControllers")

// Get user details by ID
routes.get("/user-details/:id", userDetailsController.getUserDetailsById)

// Create a new user details
routes.post("/user-details", userDetailsController.createUserDetails)

// Get all user details
routes.get("/user-details", userDetailsController.getAllUserDetails)

module.exports = routes