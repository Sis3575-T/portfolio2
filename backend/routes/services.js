const router = require('express').Router();
const {
  getServices, getAllServices, getServiceById, createService, updateService, deleteService,
} = require('../controllers/serviceController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/public', getServices);
router.get('/all', protect, getAllServices);
router.get('/:id', protect, getServiceById);
router.post('/', protect, adminOnly, createService);
router.put('/:id', protect, adminOnly, updateService);
router.delete('/:id', protect, adminOnly, deleteService);

module.exports = router;
