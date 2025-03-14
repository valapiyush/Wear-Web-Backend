const mongoose = require("mongoose");
const RefundAndReturnSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  reason: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "completed"],
    default: "pending",
  },
  refund_amount: { type: Number, required: true },
  processed_at: { type: Date },
},{
    timestamps: true
});

module.exports = mongoose.model("RefundAndReturn", RefundAndReturnSchema);
