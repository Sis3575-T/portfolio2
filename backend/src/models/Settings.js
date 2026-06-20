const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  siteTitle: { type: String, default: 'Sisay Temesgen — Portfolio' },
  siteDescription: { type: String, default: 'Full Stack Developer & AI Enthusiast' },
  seoTitle: { type: String, default: '' },
  seoDescription: { type: String, default: '' },
  logo: { type: String, default: '' },
  favicon: { type: String, default: '' },
  footerText: { type: String, default: 'Built with React & Node.js' },
  copyrightText: { type: String, default: '© 2026 Sisay Temesgen. All rights reserved.' },
  email: { type: String, default: 'sisay3575@gmail.com' },
  phone: { type: String, default: '+251 935 756 054' },
  address: { type: String, default: 'Bahir Dar, Ethiopia' },
  github: { type: String, default: 'https://github.com/Sis3575-T' },
  linkedin: { type: String, default: '' },
  twitter: { type: String, default: '' },
  telegram: { type: String, default: '' },
  maintenanceMode: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
