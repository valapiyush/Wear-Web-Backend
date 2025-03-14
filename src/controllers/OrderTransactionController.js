const orderControllerModel = require("../models/OrderTransactionsModels")


// Get all orders
const getOrders = async (req, res) => {
    try {
        const orders = await orderControllerModel.find()
        res.status(200).json({
            message: "Orders fetched successfully",
            data: orders
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Get order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await orderControllerModel.findById(req.params.id)
        if (!order) return res.status(404).json({ message: "Order not found" })
            
        res.status(200).json({
            message: "Order fetched successfully",
            data: order
        })
    } catch (error) {
            res.status(500).json({ message: error.message })
    }
}

// Create new order
const createOrder = async (req, res) => {
    try {
        const newOrder = new orderControllerModel(req.body)
        await newOrder.save()
        res.status(201).json({
            message: "Order created successfully",
            data: newOrder
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// Update order

const updateOrder = async (req, res) => {
    try {
        const order = await orderControllerModel.findByIdAndUpdate(req.params.id, req.body, { new: true })

        if (!order) return res.status(404).json({ message: "Order not found" })

        res.status(200).json({
            message: "Order updated successfully",
            data: order
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Delete order
const deleteOrder = async (req, res) => {
    try {
        const order = await orderControllerModel.findByIdAndDelete(req.params.id)
        if (!order) return res.status(404).json({ message: "Order not found" })
            
        res.status(200).json({
            message: "Order deleted successfully"
           
        })
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
}