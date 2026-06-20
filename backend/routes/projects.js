const router = require('express').Router();
const {
  getProjects, getAllProjects, getProjectById, createProject, updateProject, deleteProject, toggleProject,
} = require('../controllers/projectController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/public', getProjects);
router.get('/all', protect, getAllProjects);
router.get('/:id', protect, getProjectById);
router.post('/', protect, adminOnly, createProject);
router.put('/:id', protect, adminOnly, updateProject);
router.delete('/:id', protect, adminOnly, deleteProject);
router.patch('/:id/toggle', protect, adminOnly, toggleProject);

module.exports = router;
