const Wishlist = require('../models/WishlistModels');

const mongoose = require("mongoose");

exports.addToWishlist = async (req, res) => {
  try {
    console.log("Received Wishlist Request:", req.body);

    const { user_id, product_id } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(user_id) || !mongoose.Types.ObjectId.isValid(product_id)) {
      return res.status(400).json({ message: "Invalid user_id or product_id format." });
    }

    const existingItem = await Wishlist.findOne({ user_id, product_id });

    if (existingItem) {
      console.log("Item already exists in wishlist:", existingItem);
      return res.status(400).json({ message: "Item already in wishlist" });
    }

    const wishlistItem = new Wishlist({ user_id, product_id });
    await wishlistItem.save();
    console.log("Wishlist Item Saved:", wishlistItem);

    res.status(201).json({ message: "Added to wishlist", data: wishlistItem });
  } catch (error) {
    console.error("Wishlist Error:", error);
    res.status(500).json({ error: error.message });
  }
};


exports.getWishlistByUserId = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ user_id: req.params.user_id }).populate('product_id');
    res.json({ message: 'Wishlist', data: wishlist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { user_id } = req.body;
    await Wishlist.findOneAndDelete({ user_id, product_id: req.params.product_id });
    res.json({ message: 'Removed from wishlist' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateWishlistItem = async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Updated wishlist item', data: wishlistItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
