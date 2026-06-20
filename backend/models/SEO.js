const mongoose = require('mongoose');

const seoSchema = new mongoose.Schema({
  page: { type: String, required: true, unique: true, trim: true },
  metaTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  metaKeywords: [{ type: String }],
  ogImage: { type: String, default: '' },
  canonicalUrl: { type: String, default: '' },
  noIndex: { type: Boolean, default: false },
  schemaMarkup: { type: mongoose.Schema.Types.Mixed, default: null },
}, { timestamps: true });

module.exports = mongoose.model('SEO', seoSchema);
