const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  title: { type: String, default: 'Passionate developer.' },
  tagline: { type: String, default: 'Who I Am' },
  bio: [{ type: String }],
  facts: [{
    icon: String,
    label: String,
    value: String,
  }],
  achievements: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);
