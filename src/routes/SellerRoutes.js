const routes = require("express").Router()
const sellerController = require("../controllers/SellerController")

routes.get("/sellers", sellerController.getAllSellers)
routes.get("/sellers/:id/products", sellerController.getSellerProductsById)
routes.post("/sellers", sellerController.addSeller)
routes.delete("/sellers/:id", sellerController.deleteSellerByID)
routes.get("/sellers/:id", sellerController.getSellerById)
routes.put("/sellers/:id", sellerController.updateSellerById)

module.exports = routes