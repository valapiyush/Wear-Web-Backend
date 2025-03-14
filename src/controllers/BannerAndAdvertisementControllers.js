const Advertisement = require("../models/BannerAndAdvertisementModels");

exports.createAd = async (req, res) => {
  try {
    const ad = new Advertisement(req.body);
    await ad.save();
    res.status(201).json({ message: "Advertisement created successfully", ad });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllAds = async (req, res) => {
  try {
    const ads = await Advertisement.find();
    res.json(ads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAdById = async (req, res) => {
  try {
    const ad = await Advertisement.findById(req.params.id);
    if (!ad)
      return res.status(404).json({ message: "Advertisement not found" });
    res.json(ad);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAd = async (req, res) => {
  try {
    const updatedAd = await Advertisement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAd)
      return res.status(404).json({ message: "Advertisement not found" });
    res.json({ message: "Advertisement updated successfully", updatedAd });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAd = async (req, res) => {
  try {
    await Advertisement.findByIdAndDelete(req.params.id);
    res.json({ message: "Advertisement deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
