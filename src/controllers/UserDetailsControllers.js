const userDetailsModel = require("../models/UserDetailsModels")

const getAllUserDetails = async (req, res) => {
    try {
        const userDetails = await userDetailsModel.find().populate("user_id").populate("city_id").populate("state_id").populate("country_id")
       
        res.status(200).json({
            success: true,
            message: "All user details fetched successfully",
            data: userDetails
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getUserDetailsById = async (req, res) => {
    try {
        const userDetails = await userDetailsModel.findOne( {user_id:req.params.id}).populate("user_id").populate("city_id").populate("state_id").populate("country_id")
        res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            data: userDetails
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const createUserDetails = async (req, res) => {
    try {
        const userDetails = await userDetailsModel.create(req.body)
        res.status(201).json({
            success: true,
            message: "User details created successfully",
            data: userDetails
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateUserDetailsByUserId = async (req, res) => {
    try {
      const userDetails = await userDetailsModel
        .findOneAndUpdate({ user_id: req.params.user_id }, req.body, { new: true })
        .populate("user_id")
        .populate("city_id")
        .populate("state_id")
        .populate("country_id");
  
      if (!userDetails) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      res.status(200).json({
        success: true,
        message: "User details updated successfully",
        data: userDetails,
      });
    } catch (err) {
      console.error("Update Error:", err);
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
  
module.exports = {
    getAllUserDetails,
    getUserDetailsById,
    createUserDetails,
    updateUserDetailsByUserId
}