const router = require('express').Router();
const {
  getEducation, getAllEducation, getEducationById, createEducation, updateEducation, deleteEducation,
} = require('../controllers/educationController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/public', getEducation);
router.get('/all', protect, getAllEducation);
router.get('/:id', protect, getEducationById);
router.post('/', protect, adminOnly, createEducation);
router.put('/:id', protect, adminOnly, updateEducation);
router.delete('/:id', protect, adminOnly, deleteEducation);

module.exports = router;
