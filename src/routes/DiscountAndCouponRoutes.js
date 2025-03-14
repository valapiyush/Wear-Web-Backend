const express = require('express');
const routes = express.Router();
const DiscountAndCouponController = require('../controllers/DiscountAndCouponControllers');

routes.post('/create', DiscountAndCouponController.createCoupon);
routes.get('/', DiscountAndCouponController.getAllCoupons);
routes.post('/apply', DiscountAndCouponController.applyCoupon);
routes.delete('/:id', DiscountAndCouponController.deleteCoupon);

module.exports = routes;