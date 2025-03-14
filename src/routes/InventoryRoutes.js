const express = require('express');
const routes = express.Router();
const InventoryController = require('../controllers/InventoryControllers');

routes.post('/add', InventoryController.addInventory);
routes.get('/product/:product_id', InventoryController.getInventoryByProduct);
routes.put('/:id', InventoryController.updateInventory);
routes.delete('/:id', InventoryController.deleteInventory);

module.exports = routes;
