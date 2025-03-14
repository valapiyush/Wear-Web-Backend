const orderModel = require("../models/OrderModels")
const mongoose = require("mongoose");
const getAllOrders = async(req, res) =>{
    try{
        const orders = await orderModel.find()
        res.status(200).json({
            success: true,
            data: orders
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const getOrderByUserId = async(req, res) =>{
    try {
        console.log(req.body)
        const user_id = new mongoose.Types.ObjectId(req.body.user_id);
        console.log("Fetching orders for user:", user_id);
        // Fetch orders where user_id matches
        const orders = await orderModel.find({ user_id });

        // If no orders found, return 404
        if (!orders.length) {
            return res.status(404).json({ success: false, message: "No orders found for this user" });
        }

        res.status(200).json({ success: true, data: orders });

    } catch (err) {
        console.error("Error fetching orders:", err);
        res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
    }
}
const getOrderById = async(req, res)=>{
    try{
        const order = await orderModel.findById(req.params.id).populate("user_id")
        if(!order) return res.status(404).json({success: false, message: "Order not found"})
        res.status(200).json({
            success: true,
            data: order
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const createOrder = async(req, res) =>{
    try{
        const userId = new mongoose.Types.ObjectId(req.body.user_id);
        console.log(userId)
        const newOrder = await orderModel.create({ 
            user_id: userId,  // ✅ Store as ObjectId
            products: req.body.products,
            total_amount: req.body.total_amount,
            status: req.body.status || "Pending"
        });
        res.status(201).json({
            success: true,
            data: newOrder
        })
        
    }catch(err){
        res.status(400).json({
            success: false,
            message: err.message
        })
    }

}

const updateOrder = async(req, res) =>{
    try{
        const updatedOrder = await orderModel.findByIdAndUpdate(req.params.id, req.body,{new:true})
        if(!updatedOrder) return res.status(404).json({success: false, message: "Order not found"})
        res.status(200).json({
            success: true,
            data: updatedOrder
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const deleteOrder = async(req, res) =>{
    try{
        const deletedOrder = await orderModel.findByIdAndDelete(req.params.id)
        if(!deletedOrder) return res.status(404).json({success: false, message: "Order not found"})
        res.status(200).json({
            success: true,
            data: deletedOrder
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
module.exports = {
    createOrder,
    getAllOrders,
    getOrderByUserId,
    getOrderById,
    updateOrder,
    deleteOrder
}