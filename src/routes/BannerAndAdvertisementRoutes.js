const express = require('express');
const routes = express.Router();
const AdvertisementController = require('../controllers/BannerAndAdvertisementControllers');

routes.post('/create', AdvertisementController.createAd);
routes.get('/', AdvertisementController.getAllAds);
routes.get('/:id', AdvertisementController.getAdById);
routes.put('/:id', AdvertisementController.updateAd);
routes.delete('/:id', AdvertisementController.deleteAd);

module.exports = routes;
