const routes = require("express").Router()
const cartController = require("../controllers/CartControllers")

routes.post("/add",cartController.addToCart)

routes.get("/:id", cartController.getCartDetailsById)

routes.put("/update/:id", cartController.updateCartItem)
routes.get("/user/:id", cartController.getCartDetailsByUserId)
module.exports = routes