const router = require('express').Router();
const {
  getTestimonials, getAllTestimonials, getTestimonialById, createTestimonial, updateTestimonial, deleteTestimonial,
} = require('../controllers/testimonialController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/public', getTestimonials);
router.get('/all', protect, getAllTestimonials);
router.get('/:id', protect, getTestimonialById);
router.post('/', protect, adminOnly, createTestimonial);
router.put('/:id', protect, adminOnly, updateTestimonial);
router.delete('/:id', protect, adminOnly, deleteTestimonial);

module.exports = router;
