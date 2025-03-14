const ReturnAndRefund = require('../models/ReturnAndRefundModels');

exports.requestRefundOrReturn = async (req, res) => {
  try {
    const refundRequest = new ReturnAndRefund(req.body);
    await refundRequest.save();
    res.status(201).json({ message: 'Refund/Return request submitted successfully', refundRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await ReturnAndRefund.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRequestById = async (req, res) => {
  try {
    const request = await ReturnAndRefund.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const updatedRequest = await ReturnAndRefund.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRequest) return res.status(404).json({ message: 'Request not found' });
    res.json({ message: 'Request status updated successfully', updatedRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRequest = async (req, res) => {
  try {
    await ReturnAndRefund.findByIdAndDelete(req.params.id);
    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};