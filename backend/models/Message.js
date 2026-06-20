const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  subject: { type: String, default: '' },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  isReplied: { type: Boolean, default: false },
  repliedAt: { type: Date },
  replyContent: { type: String, default: '' },
}, { timestamps: true });

messageSchema.index({ isRead: 1, createdAt: -1 });

module.exports = mongoose.model('Message', messageSchema);
