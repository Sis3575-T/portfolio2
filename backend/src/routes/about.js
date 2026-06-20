const express = require('express');
const router = express.Router();
const { getAbout, updateAbout } = require('../controllers/aboutController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getAbout);
router.put('/', protect, adminOnly, updateAbout);

module.exports = router;
