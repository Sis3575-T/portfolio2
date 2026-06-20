const router = require('express').Router();
const {
  getMessages, getMessageById, createMessage, replyMessage, deleteMessage, markAsRead,
} = require('../controllers/messageController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/public', getMessages);
router.get('/', protect, getMessages);
router.get('/:id', protect, getMessageById);
router.post('/', createMessage);
router.put('/:id/reply', protect, adminOnly, replyMessage);
router.patch('/:id/read', protect, adminOnly, markAsRead);
router.delete('/:id', protect, adminOnly, deleteMessage);

module.exports = router;
