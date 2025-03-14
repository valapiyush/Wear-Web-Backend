const routes = require("express").Router()
const categoriesController = require("../controllers/CategoriesController")

// Get all categories
routes.get("/", categoriesController.getAllCategories)

// Get a single category by ID
routes.get("/:id", categoriesController.getCategoryById)

// Get all products in a category
routes.get("/users/:id", categoriesController.getCategoryByUserId)
// Create a new category
routes.post("/create", categoriesController.createCategory)

// Update a category by ID
routes.put("/update/:id", categoriesController.updateCategory)

// Delete a category by ID
routes.delete("/delete/:id", categoriesController.deleteCategory)

module.exports = routes