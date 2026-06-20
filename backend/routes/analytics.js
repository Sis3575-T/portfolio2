const router = require('express').Router();
const { getDashboardStats, getVisitorStats } = require('../controllers/analyticsController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/dashboard', protect, getDashboardStats);
router.get('/visitors', protect, getVisitorStats);

module.exports = router;
