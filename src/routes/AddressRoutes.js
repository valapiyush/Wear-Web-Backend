const express = require('express');
const routes = express.Router();
const AddressController = require('../controllers/AddressControllers');

routes.post('/add', AddressController.addAddress);
routes.get('/user/:user_id', AddressController.getUserAddresses);
routes.put('/:id', AddressController.updateAddress);
routes.delete('/:id', AddressController.deleteAddress);

module.exports = routes;
