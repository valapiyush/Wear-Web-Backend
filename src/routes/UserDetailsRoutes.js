const routes = require("express").Router()
const userDetailsController = require("../controllers/UserDetailsControllers")

// Get user details by ID
routes.get("/user-details/:id", userDetailsController.getUserDetailsById)

// Create a new user details
routes.post("/adddetails", userDetailsController.createUserDetails)

// Get all user details
routes.get("/user-details", userDetailsController.getAllUserDetails)

// Update user details by ID

routes.put("/update/:user_id", userDetailsController.updateUserDetailsByUserId)

module.exports = routes