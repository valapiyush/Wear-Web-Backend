const routes = require("express").Router()
const productsController = require("../controllers/ProductsController")

routes.get("/products", productsController.getAllProducts)

routes.get("/products/:id", productsController.getProductById)

routes.post("/products", productsController.createProduct)

routes.put("/products/:id", productsController.updateProduct)

routes.delete("/products/:id", productsController.deleteProduct)

routes.post("/addproduct", productsController.addProductsWithFiles)

routes.get("/user/:id", productsController.getProductsByUserId)

routes.get("/mens/:id", productsController.getMensCategory)

routes.get("/womens/:id", productsController.getWomensCategory)

routes.get("/kids/:id", productsController.getKidsCategory)
module.exports = routes