const express = require('express');
const router = express.Router();
const { getHero, updateHero } = require('../controllers/heroController');
const { protect, adminOnly } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.get('/', getHero);
router.put('/', protect, adminOnly, upload.single('profileImage'), updateHero);

module.exports = router;
