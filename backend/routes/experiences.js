const router = require('express').Router();
const {
  getExperiences, getAllExperiences, getExperienceById, createExperience, updateExperience, deleteExperience,
} = require('../controllers/experienceController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/public', getExperiences);
router.get('/all', protect, getAllExperiences);
router.get('/:id', protect, getExperienceById);
router.post('/', protect, adminOnly, createExperience);
router.put('/:id', protect, adminOnly, updateExperience);
router.delete('/:id', protect, adminOnly, deleteExperience);

module.exports = router;
