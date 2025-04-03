const Wishlist = require("../models/WishlistModels");
const mongoose = require("mongoose");

// ✅ Add to Wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(user_id) || !mongoose.Types.ObjectId.isValid(product_id)) {
      return res.status(400).json({ message: "Invalid user_id or product_id format." });
    }

    // Check if already in wishlist
    const existingItem = await Wishlist.findOne({ user_id, product_id });
    if (existingItem) {
      return res.status(400).json({ message: "Item already in wishlist" });
    }

    const wishlistItem = new Wishlist({ user_id, product_id });
    await wishlistItem.save();

    res.status(201).json({ message: "Added to wishlist", data: wishlistItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Wishlist by User ID
exports.getWishlistByUserId = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ message: "Invalid user_id format." });
    }

    const wishlist = await Wishlist.find({ user_id }).populate("product_id");
    res.json({ message: "Wishlist", data: wishlist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Remove from Wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { user_id } = req.body;
    const { product_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(user_id) || !mongoose.Types.ObjectId.isValid(product_id)) {
      return res.status(400).json({ message: "Invalid ID format." });
    }

    const result = await Wishlist.findOneAndDelete({ user_id, product_id });
    if (!result) {
      return res.status(404).json({ message: "Item not found in wishlist" });
    }

    res.json({ message: "Removed from wishlist" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateWishlist = async (req, res) => {
  try {
    const { user_id } = req.body;
    const { product_id } = req.params;  
    if (!mongoose.Types.ObjectId.isValid(user_id) || !mongoose.Types.ObjectId.isValid(product_id)) {
      return res.status(400).json({ message: "Invalid ID format." });
    }
    const wishlist = await Wishlist.findOneAndUpdate({ user_id, product_id }, req.body, { new
      : true });
    if (!wishlist) {
      return res.status(404).json({ message: "Item not found in wishlist" });
      }
      res.json({ message: "Wishlist updated", data: wishlist });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
