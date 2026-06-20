const SEO = require('../models/SEO');

exports.getAllSEO = async (req, res) => {
  try {
    const seo = await SEO.find().sort({ page: 1 });
    res.json({ success: true, data: seo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSEOByPage = async (req, res) => {
  try {
    const seo = await SEO.findOne({ page: req.params.page });
    if (!seo) return res.status(404).json({ success: false, message: 'SEO settings not found for this page' });
    res.json({ success: true, data: seo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createSEO = async (req, res) => {
  try {
    const seo = await SEO.create(req.body);
    res.status(201).json({ success: true, data: seo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateSEO = async (req, res) => {
  try {
    const seo = await SEO.findOneAndUpdate({ page: req.params.page }, req.body, { new: true, runValidators: true, upsert: true });
    res.json({ success: true, data: seo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteSEO = async (req, res) => {
  try {
    const seo = await SEO.findOneAndDelete({ page: req.params.page });
    if (!seo) return res.status(404).json({ success: false, message: 'SEO settings not found' });
    res.json({ success: true, message: 'SEO settings deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
