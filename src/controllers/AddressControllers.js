const Address = require('../models/AddressModels');

exports.addAddress = async (req, res) => {
  try {
    const address = new Address(req.body);
    await address.save();
    res.status(201).json({ 
      message: 'Address added successfully', 
      data:address 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user_id: req.params.user_id }).populate("user_id");
    res.json({
      message: 'Addresses retrieved successfully',
      data:addresses
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAddress) return res.status(404).json({ message: 'Address not found' });
    res.json({ message: 'Address updated successfully', data:updatedAddress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
