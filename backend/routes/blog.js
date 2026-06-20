const express = require('express');
const router = express.Router();
const { getBlogs, getBlog, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect, adminOnly } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.get('/', getBlogs);
router.get('/:slug', getBlog);
router.post('/', protect, adminOnly, upload.single('featuredImage'), createBlog);
router.put('/:id', protect, adminOnly, upload.single('featuredImage'), updateBlog);
router.delete('/:id', protect, adminOnly, deleteBlog);

module.exports = router;
