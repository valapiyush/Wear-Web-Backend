const routes = require("express").Router()
const roleController = require("../controllers/RoleController")

routes.get("/roles", roleController.getAllRole)
routes.post("/roles", roleController.addRole)
routes.delete("/roles/:id", roleController.deleteRole)
routes.get("/roles/:id", roleController.getRoleById)
routes.put("/roles/:id", roleController.updateRole)
module.exports = routes