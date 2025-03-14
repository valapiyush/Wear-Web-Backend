const mongoose = require("mongoose");
const ReviewAndRatingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review_text: { type: String },
},{
    timestamps: true
});

module.exports = mongoose.model("ReviewAndRating", ReviewAndRatingSchema);
