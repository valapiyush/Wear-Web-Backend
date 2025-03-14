const express = require('express');
const routes = express.Router();
const PaymentController = require('../controllers/PaymentControllers');

routes.post('/create', PaymentController.createPayment);
routes.get('/:id', PaymentController.getPaymentById);
routes.get('/user/:user_id', PaymentController.getPaymentsByUser);
routes.delete('/:id', PaymentController.deletePayment);

module.exports = routes;