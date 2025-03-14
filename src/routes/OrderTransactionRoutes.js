const routes = require("express").Router()
const orderTransactionsController = require("../controllers/OrderTransactionController")

routes.post("/order-transactions", orderTransactionsController.createOrder)

routes.get("/order-transactions", orderTransactionsController.getOrders)

routes.get("/order-transactions/:id", orderTransactionsController.getOrderById)

routes.put("/order-transactions/:id", orderTransactionsController.updateOrder)

routes.delete("/order-transactions/:id", orderTransactionsController.deleteOrder)


module.exports = routes
