const router = require('express').Router();
const {
  getSkills, getAllSkills, getSkillById, createSkill, updateSkill, deleteSkill, reorderSkills,
} = require('../controllers/skillController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/public', getSkills);
router.get('/all', protect, getAllSkills);
router.get('/:id', protect, getSkillById);
router.post('/', protect, adminOnly, createSkill);
router.put('/:id', protect, adminOnly, updateSkill);
router.delete('/:id', protect, adminOnly, deleteSkill);
router.put('/reorder/all', protect, adminOnly, reorderSkills);

module.exports = router;
