const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    products: [
      {
        product_id: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        
      },
    ],
    total_amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    },
    payment_status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Paid", "Failed", "Refunded"],
    },
    payment_method: {
      type: String,
      default: "COD",
      enum: ["Credit Card", "PayPal", "UPI", "COD"],
    },
    shipping_address_id: {
      type: Schema.Types.ObjectId,
      ref: "userdetails",
      required: true
     
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
