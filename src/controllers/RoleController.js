const roleModel = require("../models/RoleModels")
const getAllRole = async(req,res)=>{
    
    const roles = await roleModel.find()
    res.json({
        message:"Role fatched successfully",
        data: roles
    })
};
const addRole = async(req,res)=>{
    const savedRole = await roleModel.create(req.body)
    res.json({
        message: "Role added successfully",
        data: savedRole
    })
};
const deleteRole = async(req, res)=>{
    const deletedRole = await roleModel.findByIdAndDelete(req.params.id);
    res.json({
        message: "Role deleted successfully",
        data: deletedRole
    })
};
const getRoleById = async (req, res)=>{
    const foundRole = await roleModel.findById(req.params.id)
    if (!foundRole) return res.status(404).json({message: "Role not found"})
        
    res.json({
        message: "Role fetched successfully",
        data: foundRole
    })
}
const updateRole = async(req, res)=>{
    const updatedRole = await roleModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json({
        message: "Role updated successfully",
        data: updatedRole
    })
};
module.exports = {
    getAllRole, addRole, deleteRole,getRoleById, updateRole
}