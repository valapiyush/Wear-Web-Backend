const ReviewAndRating = require('../models/ReviewAndRatingModels');

exports.addReview = async (req, res) => {
  try {
    const { user_id, product_id, rating, review_text } = req.body;
    const review = new ReviewAndRating({ user_id, product_id, rating, review_text });
    await review.save();
    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviewsByProduct = async (req, res) => {
  try {
    const reviews = await ReviewAndRating.find({ product_id: req.params.product_id }).populate('user_id');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    await ReviewAndRating.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};