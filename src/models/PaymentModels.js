const mongoose = require("mongoose");
const PaymentSchema = new mongoose.Schema({
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
  amount: { type: Number, required: true },
  payment_method: {
    type: String,
    enum: ["credit_card", "debit_card", "UPI", "PayPal", "COD"],
    required: true,
  },
  transaction_id: { type: String, unique: true },
  status: {
    type: String,
    enum: ["pending", "completed", "failed", "refunded"],
    default: "pending",
  },
},{
    timestamps: true 
});

module.exports = mongoose.model("Payment", PaymentSchema);
