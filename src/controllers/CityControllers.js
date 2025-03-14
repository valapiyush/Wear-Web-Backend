const cityModel = require("../models/CityModels")
const addCity = async(req, res)=>{
    try{
        const savedCity = await cityModel.create(req.body);
        res.status(201).json({message: "City added successfully", data: savedCity});
    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}

const getAllCities = async(req, res)=>{
    try{
        const cities = await cityModel.find().populate("state_id").populate("country_id");
        res.status(200).json({success: true, data: cities});
    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}
module.exports = {addCity, getAllCities};