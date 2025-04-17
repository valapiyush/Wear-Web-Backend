const categoriesModel = require("../models/CategoriesModels")

const getAllCategories = async (req, res) => {
    try {
        const categories = await categoriesModel.find()
        res.status(200).json({
            status: "success",
            data: categories
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

const getCategoryById = async (req, res) => {
    try {
        const category = await categoriesModel.findById(req.params.id)
        if (!category) return res.status(404).json({ message: "Category not found" })
        res.status(200).json(category)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}
const getCategoryByUserId = async(req, res)=>{
    try {
        const category = await categoriesModel.find({user_id: req.params.id}).populate("user_id")
        if (!category) return res.status(404).json({ message: "Category not found" })
        res.status(200).json(category)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}
const createCategory = async (req, res) => {
    try {
        const category = new categoriesModel(req.body)
        await category.save()
        res.status(201).json(category)
    } catch (error) {
        if (error.name === "ValidationError") {
            const errors = Object.values(error.errors).map((err) => err.message)
            return res.status(400).json({ errors })
        }
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

const updateCategory = async (req, res) => {
    try {
        const category = await categoriesModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
        if (!category) return res.status(404).json({ message: "Category not found" })
        res.status(200).json(category)
    } catch (error) {
        if (error.name === "ValidationError") {
            const errors = Object.values(error.errors).map((err) => err.message)
            return res.status(400).json({ errors })
        }
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const category = await categoriesModel.findByIdAndDelete(req.params.id)
        if (!category) return res.status(404).json({ message: "Category not found" })
        res.status(200).json({ message: "Category deleted successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}



module.exports = { 
    getAllCategories, 
    getCategoryById,
    getCategoryByUserId,  
    createCategory,
    updateCategory,
    deleteCategory
}