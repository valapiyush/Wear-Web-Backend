const Inventory = require('../models/InventoryModels');

exports.addInventory = async (req, res) => {
  try {
    const inventoryItem = new Inventory(req.body);
    await inventoryItem.save();
    res.status(201).json({ message: 'Inventory item added successfully', inventoryItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getInventoryByProduct = async (req, res) => {
  try {
    const inventory = await Inventory.find({ product_id: req.params.product_id });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const updatedInventory = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedInventory) return res.status(404).json({ message: 'Inventory item not found' });
    res.json({ message: 'Inventory updated successfully', updatedInventory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteInventory = async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Inventory item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};