const asyncHandler = require('express-async-handler');
const Message = require('../models/Message');

// POST /api/messages (public — contact form)
const sendMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    res.status(400); throw new Error('Name, email, and message are required');
  }
  const msg = await Message.create({
    name, email, subject, message,
    ipAddress: req.ip,
  });
  res.status(201).json({ success: true, message: 'Message sent successfully', data: msg });
});

// GET /api/messages (admin)
const getMessages = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const search = req.query.search || '';
  const filter = search
    ? { $or: [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }, { subject: { $regex: search, $options: 'i' } }] }
    : {};
  if (req.query.read === 'true') filter.read = true;
  if (req.query.read === 'false') filter.read = false;

  const total = await Message.countDocuments(filter);
  const messages = await Message.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const unreadCount = await Message.countDocuments({ read: false });

  res.json({ success: true, data: messages, total, page, pages: Math.ceil(total / limit), unreadCount });
});

// PUT /api/messages/:id/read (admin)
const markRead = asyncHandler(async (req, res) => {
  const msg = await Message.findByIdAndUpdate(req.params.id, { read: req.body.read ?? true }, { new: true });
  if (!msg) { res.status(404); throw new Error('Message not found'); }
  res.json({ success: true, data: msg });
});

// DELETE /api/messages/:id (admin)
const deleteMessage = asyncHandler(async (req, res) => {
  const msg = await Message.findByIdAndDelete(req.params.id);
  if (!msg) { res.status(404); throw new Error('Message not found'); }
  res.json({ success: true, message: 'Message deleted' });
});

// GET /api/messages/unread-count (admin)
const getUnreadCount = asyncHandler(async (req, res) => {
  const count = await Message.countDocuments({ read: false });
  res.json({ success: true, count });
});

module.exports = { sendMessage, getMessages, markRead, deleteMessage, getUnreadCount };
