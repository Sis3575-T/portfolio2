const router = require('express').Router();
const {
  getBlogs, getAllBlogs, getBlogBySlug, getBlogById, createBlog, updateBlog, deleteBlog,
} = require('../controllers/blogController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/public', getBlogs);
router.get('/all', protect, getAllBlogs);
router.get('/slug/:slug', getBlogBySlug);
router.get('/:id', protect, getBlogById);
router.post('/', protect, adminOnly, createBlog);
router.put('/:id', protect, adminOnly, updateBlog);
router.delete('/:id', protect, adminOnly, deleteBlog);

module.exports = router;
