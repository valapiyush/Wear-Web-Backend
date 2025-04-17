// routes/admin.js

const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const Order = require('../models/OrderModels');
const Seller = require('../models/SellerModel');
const mongoose = require('mongoose');
// GET /admin/dashboard-stats
router.get('/dashboard-stats', async (req, res) => {
  try {
    const CUSTOMER_ROLE_ID = "67bd469cef31516d015d5fe6";
    const totalUsers = await User.countDocuments({ role_id: new mongoose.Types.ObjectId(CUSTOMER_ROLE_ID) });
    const totalSellers = await Seller.countDocuments();
    // const pendingVerification = await Seller.countDocuments({ isVerified: false });
    
    const totalOrders = await Order.countDocuments();
    
    const revenueData = await Order.aggregate([
      { $match: { status: 'Pending' } },
      { $group: { _id: null, total: { $sum: '$total_amount' } } }
    ]);

    const totalRevenue = revenueData[0]?.total || 0;
    const pendingVerification = 0;
    

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalSellers,
        totalOrders,
        totalRevenue,
        pendingVerification,
      },
    });
  } catch (err) {
    console.error('Admin dashboard error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


module.exports = router;
