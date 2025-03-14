const sellerModel = require("../models/SellerModel");
const getAllSellers = async (req, res) => {
  try {
    const sellers = await sellerModel.find().populate("user_id");
    res.status(200).json({
      success: true,
      data: sellers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getSellerProductsById = async(req, res)=>{
  try{
    const sellerId = req.params.id;
    const sellerProducts = await ProductModel.find({seller_id: sellerId}).populate('seller_id');
    res.status(200).json({
      success: true,
      data: sellerProducts,
    });
  }catch(error){
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
const addSeller = async (req, res) => {
  try {
    const savedSeller = await sellerModel.create(req.body);
    res.status(201).json({
      success: true,
      data: savedSeller,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteSellerByID = async (req, res) => {
  try {
    const deletedSeller = await sellerModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      data: deletedSeller,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSellerById = async (req, res) => {
  try {
    const foundSeller = await sellerModel.findById(req.params.id);
    if (!foundSeller)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.status(200).json({
      success: true,
      data: foundSeller,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateSellerById = async (req, res) => {
  try {
    const updatedSeller = await sellerModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: updatedSeller,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllSellers,
  getSellerProductsById,
  addSeller,
  deleteSellerByID,
  getSellerById,
  updateSellerById,
};
