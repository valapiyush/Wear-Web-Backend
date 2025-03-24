const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailUtil = require("../utils/MailUtil");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const secretKey = crypto.randomBytes(8).toString("hex"); // Generates a 32-character hex string
console.log(secretKey);

const SECRET_KEY = process.env.SECRET_KEY || crypto.randomBytes(16).toString("hex");
const loginUser = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role_id;
    const foundUserFromusername = await UserModel.findOne({
      username: username,
    }).populate("role_id");

    if (!foundUserFromusername) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isPasswordValid = bcrypt.compareSync(
      password,
      foundUserFromusername.password
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }
    if (foundUserFromusername.role_id._id.toString() !== role) {
      return res.status(401).json({ success: false, message: "Invalid role" });
    }

    res.status(200).json({
      success: true,
      data: foundUserFromusername,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().populate("role_id");
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const signup = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;
    // const savedUser = await UserModel.create(req.body);

    const savedUser = await UserModel.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role_id: req.body.role_id,
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
    await mailUtil.sendingMail(
      savedUser.email,
      "Welcome to WearWeb",
      emailContent
    );
    res.status(201).json({
      success: true,
      data: savedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const addUser = async (req, res) => {
  try {
    const savedUser = await UserModel.create(req.body);
    res.status(200).json({
      success: true,
      message: savedUser.message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteUserByID = async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      data: deletedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const foundUser = await UserModel.findById(req.params.id);
    if (!foundUser)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.status(200).json({
      success: true,
      data: foundUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateUserById = async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const forgotpassword = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const token = jwt.sign({ id: user._id },SECRET_KEY, {
      expiresIn: "1h",
    });
    const link = `http://localhost:5173/resetpassword/${token}`;
    await mailUtil.sendingMail(
      user.email,
      "Reset Password",
      `<a href="${link}">Reset Password</a>`
    );
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const verified = jwt.verify(token, SECRET_KEY);
    if (!verified) {
        return res.status(403).json({ success: false, message: "Token expired" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await UserModel.findByIdAndUpdate(verified.id, { password: hashedPassword }, { new: true });
    res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
  getAllUsers,
  addUser,
  signup,
  deleteUserByID,
  getUserById,
  updateUserById,
  loginUser,
  forgotpassword,
  resetPassword
};
