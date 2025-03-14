const express = require('express');
const routes = express.Router();
const WishlistController = require('../controllers/WishlistControllers');

routes.post('/add', WishlistController.addToWishlist);
routes.get('/:id', WishlistController.getWishlist);
routes.delete('/:id', WishlistController.removeFromWishlist);
routes.put('/:user_id', WishlistController.updateWishlistItem);
routes.get('/getwishlistbyuserid/:id', WishlistController.getWishlistByUserId);
module.exports = routes;