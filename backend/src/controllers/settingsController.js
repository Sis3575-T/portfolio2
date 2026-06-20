const asyncHandler = require('express-async-handler');
const Settings = require('../models/Settings');

const getSettings = asyncHandler(async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create({});
  res.json({ success: true, data: settings });
});

const updateSettings = asyncHandler(async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) settings = new Settings();
  Object.assign(settings, req.body);
  if (req.files) {
    if (req.files.logo) settings.logo = req.files.logo[0].path;
    if (req.files.favicon) settings.favicon = req.files.favicon[0].path;
  }
  await settings.save();
  res.json({ success: true, data: settings });
});

module.exports = { getSettings, updateSettings };
