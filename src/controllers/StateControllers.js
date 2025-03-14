const stateModel = require('../models/StateModels'); 
const addState = async (req, res) => {
    try {
        const state = await stateModel.create(req.body)
        res.status(201).json({
            message: "State added successfully",
            data: state
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getAllStates = async (req, res) => {
    try {
        const states = await stateModel.find().populate("country_id")
        res.json({
            message: "States retrieved successfully",
            data: states
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getStateById = async (req, res) => {
    try {
        const state = await stateModel.findById(req.params.id)
        res.json({
            message: "State retrieved successfully",
            data: state
        })
    } catch (error) {
        res.status(500).json({ message: error.message })        
    }
}

module.exports = { addState, getAllStates, getStateById }