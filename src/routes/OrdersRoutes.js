const orderController = require("../controllers/OrdersControllers")
const routes = require("express").Router();

routes.post("/orders", orderController.createOrder);

routes.get("/orders", orderController.getAllOrders);

routes.put("/orders/:id", orderController.updateOrder);

routes.delete("/orders/:id", orderController.deleteOrder);

routes.get("/orders/:id", orderController.getOrderById);

routes.get("/orders/users/:id", orderController.getOrderByUserId)
module.exports = routes;