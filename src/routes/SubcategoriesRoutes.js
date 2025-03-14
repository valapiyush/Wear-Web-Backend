const routes = require("express").Router()
const subcategoriesController = require("../controllers/SubcategoriesController")

routes.get("/subcategories", subcategoriesController.getAllSubcategories)

routes.get("/subcategories/:id", subcategoriesController.getSubcategoryById)

routes.post("/subcategories", subcategoriesController.createSubcategory)

routes.put("/subcategories/:id", subcategoriesController.updateSubcategory)

routes.delete("/subcategories/:id", subcategoriesController.deleteSubcategory)

routes.get("/getsubcategoriesbycategory/:id", subcategoriesController.getSubcategoryByCategoryId)

module.exports = routes