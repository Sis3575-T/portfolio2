const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, markRead, deleteMessage, getUnreadCount } = require('../controllers/messageController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/', sendMessage);
router.get('/', protect, adminOnly, getMessages);
router.get('/unread-count', protect, adminOnly, getUnreadCount);
router.put('/:id/read', protect, adminOnly, markRead);
router.delete('/:id', protect, adminOnly, deleteMessage);

module.exports = router;
