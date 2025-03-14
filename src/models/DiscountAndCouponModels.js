const mongoose = require("mongoose");
const DiscountAndCouponSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  discount_type: {
    type: String,
    enum: ["percentage", "fixed"],
    required: true,
  },
  discount_value: { type: Number, required: true },
  min_order_value: { type: Number, default: 0 },
  max_discount: { type: Number },
  valid_from: { type: Date, required: true },
  valid_to: { type: Date, required: true },
  status: {
    type: String,
    enum: ["active", "expired", "disabled"],
    default: "active",
  },
});

module.exports = mongoose.model("DiscountAndCoupon", DiscountAndCouponSchema);
