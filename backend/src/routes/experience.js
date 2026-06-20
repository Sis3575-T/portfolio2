const express = require('express');
const router = express.Router();
const { getExperiences, createExperience, updateExperience, deleteExperience } = require('../controllers/experienceController');
const { protect, adminOnly } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.get('/', getExperiences);
router.post('/', protect, adminOnly, upload.single('companyLogo'), createExperience);
router.put('/:id', protect, adminOnly, upload.single('companyLogo'), updateExperience);
router.delete('/:id', protect, adminOnly, deleteExperience);

module.exports = router;
