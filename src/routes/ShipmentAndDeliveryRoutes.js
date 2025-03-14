const express = require("express");
const router = express.Router();
const shipmentController = require("../controllers/ShipmentAndDeliveryControllers");

//  Create a new shipment
router.post("/", shipmentController.createShipment);

//  Get all shipments
router.get("/", shipmentController.getAllShipments);

//  Get a shipment by ID
router.get("/:id", shipmentController.getShipmentById);

//  Get shipments by user ID
router.get("/user/:user_id", shipmentController.getShipmentsByUserId);

//  Update a shipment
router.put("/:id", shipmentController.updateShipment);

//  Delete a shipment
router.delete("/:id", shipmentController.deleteShipment);

module.exports = router;
