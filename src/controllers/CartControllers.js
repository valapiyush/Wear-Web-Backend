const cartModel = require("../models/CartModels");

const getCartDetailsByUserId = async (req, res)=>{
    try{
        const cartDetails = await cartModel.find({user_id: req.params.id}).populate("user_id").populate("product_id");
        res.status(200).json({
            success: true, 
            data: cartDetails
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}
const getCartDetailsById = async(req, res) =>{
    try{
        const cartDetails = await cartModel.findById(req.params.id).populate("product_id");
        if(!cartDetails){
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }
        res.status(200).json({
            success: true,
            data: cartDetails
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

const addToCart = async (req, res) => {
    try{
        
        const savedCart = await cartModel.create(req.body)
        res.status(201).json({
            success: true,
            data: savedCart
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

const updateCartItem = async (req, res) => {
    try{
        const updatedCart = await cartModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!updatedCart){
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }
        res.status(200).json({
            success: true,
            data: updatedCart
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

const deleteCartItem = async (req, res) => {
    try{
        const deletedCart = await cartModel.findByIdAndDelete(req.params.id)
        if(!deletedCart){
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Cart deleted successfully"
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}
module.exports = {
    getCartDetailsByUserId,
    getCartDetailsById,
    addToCart,
    updateCartItem,
    deleteCartItem
}