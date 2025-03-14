const express = require('express');
const routes = express.Router();
const RefundAndReturnController = require('../controllers/ReturnAndRefundControllers');

routes.post('/request', RefundAndReturnController.requestRefundOrReturn);
routes.get('/', RefundAndReturnController.getAllRequests);
routes.get('/:id', RefundAndReturnController.getRequestById);
routes.put('/:id', RefundAndReturnController.updateRequestStatus);
routes.delete('/:id', RefundAndReturnController.deleteRequest);

module.exports = routes;
