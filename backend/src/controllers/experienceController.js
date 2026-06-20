const asyncHandler = require('express-async-handler');
const Experience = require('../models/Experience');

const getExperiences = asyncHandler(async (req, res) => {
  const filter = req.query.all === 'true' ? {} : { visible: true };
  const experiences = await Experience.find(filter).sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: experiences });
});

const createExperience = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.companyLogo = req.file.path;
  const exp = await Experience.create(data);
  res.status(201).json({ success: true, data: exp });
});

const updateExperience = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.companyLogo = req.file.path;
  const exp = await Experience.findByIdAndUpdate(req.params.id, data, { new: true });
  if (!exp) { res.status(404); throw new Error('Experience not found'); }
  res.json({ success: true, data: exp });
});

const deleteExperience = asyncHandler(async (req, res) => {
  const exp = await Experience.findByIdAndDelete(req.params.id);
  if (!exp) { res.status(404); throw new Error('Experience not found'); }
  res.json({ success: true, message: 'Experience deleted' });
});

module.exports = { getExperiences, createExperience, updateExperience, deleteExperience };
