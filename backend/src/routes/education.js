const express = require('express');
const router = express.Router();
const { getEducations, createEducation, updateEducation, deleteEducation } = require('../controllers/educationController');
const { protect, adminOnly } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.get('/', getEducations);
router.post('/', protect, adminOnly, upload.single('logo'), createEducation);
router.put('/:id', protect, adminOnly, upload.single('logo'), updateEducation);
router.delete('/:id', protect, adminOnly, deleteEducation);

module.exports = router;
