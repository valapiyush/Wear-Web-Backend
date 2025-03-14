const routes = require("express").Router()
const stateController = require("../controllers/StateControllers")

// Get all states
routes.get("/states", stateController.getAllStates)

// Get a single state by ID 
routes.get("/states/:id", stateController.getStateById)

// Create a new state
routes.post("/states", stateController.addState)

module.exports = routes
