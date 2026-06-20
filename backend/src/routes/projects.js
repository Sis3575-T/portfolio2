const express = require('express');
const router = express.Router();
const { getProjects, getProject, createProject, updateProject, deleteProject, reorderProjects } = require('../controllers/projectController');
const { protect, adminOnly } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', protect, adminOnly, upload.array('images', 10), createProject);
router.put('/reorder', protect, adminOnly, reorderProjects);
router.put('/:id', protect, adminOnly, upload.array('images', 10), updateProject);
router.delete('/:id', protect, adminOnly, deleteProject);

module.exports = router;
