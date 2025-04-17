const orderController = require("../controllers/OrdersControllers")
const routes = require("express").Router();

routes.post("/orders", orderController.createOrder);

routes.get("/orders/dashboard-stats", orderController.getDashboardStats);

routes.get("/orders/sales-data", orderController.getSalesData);

routes.get("/orders", orderController.getAllOrders);

routes.put("/orders/:id", orderController.updateOrder);

routes.delete("/orders/:id", orderController.deleteOrder);

routes.get("/orders/:order_id", orderController.getOrderById);

routes.get("/orders/users/:id", orderController.getOrderByUserId);

routes.get("/orders/:id/invoice", orderController.generateInvoice);

module.exports = routes;