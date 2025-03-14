const countryModel = require("../models/CountryModels")

// Fetch all countries
const getAllCountries = async (req, res) => {
    try {
        const countries = await countryModel.find()
        res.json({
            success: true,
            data: countries
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

// Fetch a single country by ID
const getCountryById = async (req, res) => {
    try {
        const country = await countryModel.findById(req.params.id)
        if (!country) return res.status(404).json({ error: "Country not found" })
        res.json({
            success: true,
            data: country
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

// Create a new country
const createCountry = async (req, res) => {
    try {
       
        const newCountry = await countryModel.create(req.body)
        res.status(201).json({
            success: true,
            data: newCountry
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}
module.exports = { getAllCountries, getCountryById, createCountry }