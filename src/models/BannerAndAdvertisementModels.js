const mongoose = require("mongoose");
const BannerAndAdvertisementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image_url: { type: String, required: true },
  redirect_url: { type: String },
  position: {
    type: String,
    enum: ["homepage", "category", "checkout", "promo"],
    required: true,
  },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
});

module.exports = mongoose.model(
  "bannerandadvertisement",
  BannerAndAdvertisementSchema
);
