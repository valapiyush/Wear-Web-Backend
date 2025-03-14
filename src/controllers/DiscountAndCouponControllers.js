const DiscountAndCoupon = require("../models/DiscountAndCouponModels");

exports.createCoupon = async (req, res) => {
  try {
    const coupon = new DiscountAndCoupon(req.body);
    await coupon.save();
    res.status(201).json({ message: "Coupon created successfully", coupon });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await DiscountAndCoupon.find();
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.applyCoupon = async (req, res) => {
  try {
    const { code, order_value } = req.body;
    const coupon = await DiscountAndCoupon.findOne({ code, status: "active" });
    if (!coupon)
      return res.status(400).json({ message: "Invalid or expired coupon" });
    let discount =
      coupon.discount_type === "percentage"
        ? (order_value * coupon.discount_value) / 100
        : coupon.discount_value;
    if (coupon.max_discount) discount = Math.min(discount, coupon.max_discount);
    res.json({ message: "Coupon applied", discount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCoupon = async (req, res) => {
  try {
    await DiscountAndCoupon.findByIdAndDelete(req.params.id);
    res.json({ message: "Coupon deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
