const mongoose = require("mongoose");
const InventorySchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  stock_count: { type: Number, required: true },
  low_stock_threshold: { type: Number, default: 5 },
},{
    timestamps: true,
});

module.exports = mongoose.model("Inventory", InventorySchema);
