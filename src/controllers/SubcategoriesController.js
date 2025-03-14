const subcategoriesModel = require("../models/SubcategoriesModels")
const mongoose = require("mongoose")
const getAllSubcategories = async (req, res) => {
    try {
        const subcategories = await subcategoriesModel.find().populate("category_id")
        res.status(200).json({
            message: "Subcategories retrieved successfully",
            data: subcategories
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getSubcategoryById = async (req, res) => {
    try {
        const subcategory = await subcategoriesModel.findById(req.body.category_id)
        if (!subcategory) return res.status(404).json({ message: "Subcategory not found" })
        res.status(200).json({
            message: "Subcategory retrieved successfully",
            data: subcategory})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createSubcategory = async (req, res) => {
    try {
        const subcategory = await subcategoriesModel.create(req.body)
        res.status(201).json({
            message: "Subcategory created successfully",
            data: subcategory
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateSubcategory = async (req, res) => {
    try {
        const subcategory = await subcategoriesModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!subcategory) return res.status(404).json({ message: "Subcategory not found" })
        res.status(200).json({
            message: "Subcategory updated successfully",
            data: subcategory
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteSubcategory = async (req, res) => {
    try {
        const subcategory = await subcategoriesModel.findByIdAndDelete(req.body.category_id)
        if (!subcategory) return res.status(404).json({ message: "Subcategory not found" })
        res.status(200).json({
            message: "Subcategory deleted successfully",
            data: subcategory
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getSubcategoryByCategoryId = async (req, res) => {
    try {
        const subcategory = await subcategoriesModel.find({ "category_id": req.params.id }).populate("category_id")
        console.log(subcategory)
        if (!subcategory) return res.status(404).json({ message: "Subcategory not found" })
        res.status(200).json({
            message: "Subcategory retrieved successfully",
            data: subcategory
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }   
}
module.exports = {
    getAllSubcategories,
    getSubcategoryById,
    createSubcategory,
    updateSubcategory,
    deleteSubcategory,
    getSubcategoryByCategoryId,
}
