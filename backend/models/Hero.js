const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  introduction: { type: String, required: true, trim: true },
  avatar: { type: String, default: '' },
  socialLinks: [{
    platform: { type: String, required: true },
    url: { type: String, required: true },
    icon: { type: String, default: '' },
  }],
  buttons: [{
    label: { type: String, required: true },
    url: { type: String, default: '' },
    type: { type: String, enum: ['primary', 'outline'], default: 'primary' },
    file: { type: String, default: '' },
  }],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Hero', heroSchema);
