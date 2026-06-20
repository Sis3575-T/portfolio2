const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  biography: { type: String, required: true },
  careerJourney: { type: String, default: '' },
  keyAchievements: [{ type: String, trim: true }],
  stats: [{
    label: { type: String, required: true },
    value: { type: String, required: true },
    suffix: { type: String, default: '' },
  }],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);
