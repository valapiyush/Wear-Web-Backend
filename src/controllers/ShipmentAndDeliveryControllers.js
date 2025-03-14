const ShipmentAndDelivery = require("../models/ShipmentAndDeliveryModels");
const mongoose = require("mongoose");

// 📌 Create a new shipment record
const createShipment = async (req, res) => {
    try {
        const { order_id, user_id, courier_name, tracking_id, estimated_delivery } = req.body;

        if (!mongoose.Types.ObjectId.isValid(order_id) || !mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ success: false, message: "Invalid order_id or user_id" });
        }

        const newShipment = await ShipmentAndDelivery.create({
            order_id,
            user_id,
            courier_name,
            tracking_id,
            estimated_delivery
        });

        res.status(201).json({ success: true, data: newShipment });
    } catch (error) {
        console.error("❌ Error creating shipment:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// 📌 Get all shipments
const getAllShipments = async (req, res) => {
    try {
        const shipments = await ShipmentAndDelivery.find().populate("order_id user_id");
        res.status(200).json({ success: true, data: shipments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 📌 Get shipment by ID
const getShipmentById = async (req, res) => {
    try {
        const shipment = await ShipmentAndDelivery.findById(req.params.id).populate("order_id user_id");

        if (!shipment) {
            return res.status(404).json({ success: false, message: "Shipment not found" });
        }

        res.status(200).json({ success: true, data: shipment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 📌 Get shipment by user ID
const getShipmentsByUserId = async (req, res) => {
    try {
        const { user_id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }

        const shipments = await ShipmentAndDelivery.find({ user_id }).populate("order_id");

        if (!shipments.length) {
            return res.status(404).json({ success: false, message: "No shipments found for this user" });
        }

        res.status(200).json({ success: true, data: shipments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 📌 Update shipment details
const updateShipment = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedShipment = await ShipmentAndDelivery.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedShipment) {
            return res.status(404).json({ success: false, message: "Shipment not found" });
        }

        res.status(200).json({ success: true, data: updatedShipment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 📌 Delete a shipment record
const deleteShipment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedShipment = await ShipmentAndDelivery.findByIdAndDelete(id);

        if (!deletedShipment) {
            return res.status(404).json({ success: false, message: "Shipment not found" });
        }

        res.status(200).json({ success: true, message: "Shipment deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createShipment,
    getAllShipments,
    getShipmentById,
    getShipmentsByUserId,
    updateShipment,
    deleteShipment
};
