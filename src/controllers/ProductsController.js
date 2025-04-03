const productsModel = require("../models/ProductsModels");
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/CloudinaryUtil");
const mongoose = require("mongoose");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//multer object....

const upload = multer({
  storage: storage,
  //fileFilter:
}).single("image");
const getAllProducts = async (req, res) => {
  try {
    const allProducts = await productsModel
      .find()
      .populate("category_id")
      .populate("sub_category_id");
    res.status(200).json({
      success: true,
      data: allProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productsModel.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await productsModel.create(req.body);
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const addProductsWithFiles = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      // database data store
      //cloundinary
      
      const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
      console.log(cloudinaryResponse);
      console.log(req.body);

      //store data in database
      req.body.product_image_urls = cloudinaryResponse.secure_url;
      const product = await productsModel.create(req.body);

      res.status(200).json({
        message: "Products saved successfully",
        data: product,
      });
    }
  });
};
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await productsModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getProductsByUserId = async(req, res)=>{
  try{
    const products = await productsModel.find({user_id: req.params.id});
    res.status(200).json({
      success: true,
      data: products,
    });
  }catch(err){
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addProductsWithFiles,
  getProductsByUserId,
};
