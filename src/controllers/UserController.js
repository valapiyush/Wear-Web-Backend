const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailUtil = require("../utils/MailUtil");
const loginUser = async (req, res)=>{
    
    try{
        const username = req.body.username
        const password = req.body.password
        const role = req.body.role_id
        const foundUserFromusername = await UserModel.findOne({username: username}).populate("role_id");

        if(!foundUserFromusername){
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const isPasswordValid = bcrypt.compareSync(password, foundUserFromusername.password);
        if(!isPasswordValid){
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }
        if(foundUserFromusername.role_id._id.toString() !== role){
            return res.status(401).json({ success: false, message: 'Invalid role' });
        }

        console.log(foundUserFromusername);
        res.status(200).json({
            success: true,
            data: foundUserFromusername
        });
    }    
    catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}
const getAllUsers = async(req, res)=>{
    try{
        const users = await UserModel.find().populate("role_id");
        res.status(200).json({
        success: true,
        data: users
    });


    }catch(error){
        res.status(500).json({ 
            success: false, message: error.message 
        });
    }
};
const signup = async(req, res)=>{
    try{
        const salt =  bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hashedPassword
        // const savedUser = await UserModel.create(req.body);

        const savedUser = await UserModel.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role_id: req.body.role_id
        });
        const emailContent = `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2>Welcome to Our Platform, ${savedUser.username}!</h2>
                <p>Thank you for signing up. We are excited to have you on board.</p>
                <p>Click the button below to verify your email:</p>
                <a href="http://localhost:3000/verify/${savedUser._id}" style="background-color: #007BFF; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
                <p>Best Regards,<br> WearWeb Team</p>
            </div>
        `;
        await mailUtil.sendingMail(savedUser.email, "Welcome to WearWeb", emailContent);
        console.log(savedUser)
        res.status(201).json({
            success: true,
            data: savedUser
        });


    }catch(error){
        console.log(error)
        res.status(500).json({ success: false, message: error.message });
    }
};

const addUser = async (req, res)=>{
    try{
        const savedUser = await UserModel.create(req.body);
        res.status(200).json({
            success: true,
            message: savedUser.message
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const deleteUserByID = async (req, res)=>{
    try{
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success:true,
            data:deletedUser
        });
    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
};

const getUserById = async(req, res)=>{
   try{
    const foundUser = await UserModel.findById(req.params.id);
    if(!foundUser) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({
        success: true,
        data: foundUser
    });
   }catch(error){
    res.status(500).json({ success: false, message: error.message });  
    }
};
const updateUserById = async(req, res)=>{
    try{
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json({
        success:true,
        data:updatedUser
    });
    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
};


module.exports = {
    getAllUsers, addUser, signup, deleteUserByID,getUserById, updateUserById,loginUser
};
