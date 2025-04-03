const express = require('express');
const routes = express.Router();
const WishlistController = require('../controllers/WishlistControllers');

routes.post('/add', WishlistController.addToWishlist);
routes.get('/user/:user_id', WishlistController.getWishlistByUserId);
routes.delete('/remove/:product_id', WishlistController.removeFromWishlist);
routes.put("/update/:id", WishlistController.updateWishlist);

module.exports = routes;
