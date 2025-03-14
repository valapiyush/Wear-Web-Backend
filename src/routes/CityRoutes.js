const routes = require("express").Router()
const cityController = require("../controllers/CityControllers")

routes.get("/cities", cityController.getAllCities)
routes.post("/cities", cityController.addCity)
module.exports = routes