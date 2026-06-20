const asyncHandler = require('express-async-handler');
const Education = require('../models/Education');

const getEducations = asyncHandler(async (req, res) => {
  const filter = req.query.all === 'true' ? {} : { visible: true };
  const educations = await Education.find(filter).sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: educations });
});

const createEducation = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.logo = req.file.path;
  const edu = await Education.create(data);
  res.status(201).json({ success: true, data: edu });
});

const updateEducation = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.logo = req.file.path;
  const edu = await Education.findByIdAndUpdate(req.params.id, data, { new: true });
  if (!edu) { res.status(404); throw new Error('Education not found'); }
  res.json({ success: true, data: edu });
});

const deleteEducation = asyncHandler(async (req, res) => {
  const edu = await Education.findByIdAndDelete(req.params.id);
  if (!edu) { res.status(404); throw new Error('Education not found'); }
  res.json({ success: true, message: 'Education deleted' });
});

module.exports = { getEducations, createEducation, updateEducation, deleteEducation };
