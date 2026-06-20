const router = require('express').Router();
const { getAllSEO, getSEOByPage, createSEO, updateSEO, deleteSEO } = require('../controllers/seoController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', protect, getAllSEO);
router.get('/:page', getSEOByPage);
router.post('/', protect, adminOnly, createSEO);
router.put('/:page', protect, adminOnly, updateSEO);
router.delete('/:page', protect, adminOnly, deleteSEO);

module.exports = router;
