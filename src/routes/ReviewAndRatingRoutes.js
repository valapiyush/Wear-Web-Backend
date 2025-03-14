const express = require('express');
const routes = express.Router();
const ReviewAndRatingController = require('../controllers/ReviewAndRatingControllers');

routes.post('/add', ReviewAndRatingController.addReview);
routes.get('/:product_id', ReviewAndRatingController.getReviewsByProduct);
routes.delete('/:id', ReviewAndRatingController.deleteReview);

module.exports = routes;