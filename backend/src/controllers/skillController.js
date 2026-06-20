const asyncHandler = require('express-async-handler');
const Skill = require('../models/Skill');

const getSkills = asyncHandler(async (req, res) => {
  const filter = req.query.all === 'true' ? {} : { visible: true };
  const skills = await Skill.find(filter).sort({ order: 1, category: 1 });
  res.json({ success: true, data: skills });
});

const createSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.create(req.body);
  res.status(201).json({ success: true, data: skill });
});

const updateSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!skill) { res.status(404); throw new Error('Skill not found'); }
  res.json({ success: true, data: skill });
});

const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndDelete(req.params.id);
  if (!skill) { res.status(404); throw new Error('Skill not found'); }
  res.json({ success: true, message: 'Skill deleted' });
});

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
