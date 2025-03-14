const routes = require("express").Router()
const countruController = require("../controllers/CountryControllers")

// Get all countries
routes.get("/countries", countruController.getAllCountries)

// Get a single country by ID
routes.get("/countries/:id", countruController.getCountryById)

// Create a new country
routes.post("/countries", countruController.createCountry)

module.exports = routes