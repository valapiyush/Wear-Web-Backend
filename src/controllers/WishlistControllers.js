const Wishlist = require('../models/WishlistModels');

exports.addToWishlist = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;
    const wishlistItem = new Wishlist({ user_id, product_id });
    await wishlistItem.save();
    res.status(201).json({ message: 'Added to wishlist', data: wishlistItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ user_id: req.params.user_id }).populate('product_id');
    res.json({
        message: 'Wishlist',
        data: wishlist
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);
    res.json({ message: 'Removed from wishlist' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateWishlistItem = async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({
        message: 'Updated wishlist item',
        data:wishlistItem
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getWishlistByUserId = async(req, res)=>{
    try{
        const wishlist = await Wishlist.find({user_id:req.params.user_id}).populate('product_id');
        res.json({
            message: 'Wishlist',
            data:wishlist
        });
    }catch(error){
        res.status(500).json({ error: error.message });
    }
};

exports.getWishlistByProductId = async(req, res)=>{
    try{
        const wishlist = await Wishlist.find({product_id:req.params.product_id}).populate('user_id');
        res.json({
            message: 'Wishlist',
            data:wishlist
        });
    }catch(error){
        res.status(500).json({ error: error.message });
    }
};

