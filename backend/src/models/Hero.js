const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  name: { type: String, default: 'Sisay Temesgen' },
  title: { type: String, default: 'Full Stack Developer & AI Enthusiast' },
  description: { type: String, default: '' },
  profileImage: { type: String, default: '' },
  cvUrl: { type: String, default: '' },
  availableForWork: { type: Boolean, default: true },
  availableText: { type: String, default: 'Available for opportunities' },
  stats: [{
    number: String,
    label: String,
  }],
  buttons: [{
    label: String,
    href: String,
    type: { type: String, enum: ['primary', 'outline', 'ghost'], default: 'primary' },
  }],
  socialLinks: [{
    platform: String,
    url: String,
    icon: String,
  }],
}, { timestamps: true });

module.exports = mongoose.model('Hero', heroSchema);
