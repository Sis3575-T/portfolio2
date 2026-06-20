const asyncHandler = require('express-async-handler');
const Blog = require('../models/Blog');

const getBlogs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  else if (!req.user) filter.status = 'published';
  if (req.query.category) filter.categories = req.query.category;
  if (req.query.tag) filter.tags = req.query.tag;
  if (req.query.search) {
    filter.$or = [
      { title: { $regex: req.query.search, $options: 'i' } },
      { excerpt: { $regex: req.query.search, $options: 'i' } },
    ];
  }
  const total = await Blog.countDocuments(filter);
  const blogs = await Blog.find(filter)
    .select('-content')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  res.json({ success: true, data: blogs, total, page, pages: Math.ceil(total / limit) });
});

const getBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (!blog) { res.status(404); throw new Error('Blog post not found'); }
  blog.views += 1;
  await blog.save({ validateBeforeSave: false });
  res.json({ success: true, data: blog });
});

const createBlog = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (typeof data.categories === 'string') data.categories = JSON.parse(data.categories);
  if (typeof data.tags === 'string') data.tags = JSON.parse(data.tags);
  if (req.file) data.featuredImage = req.file.path;
  const blog = await Blog.create(data);
  res.status(201).json({ success: true, data: blog });
});

const updateBlog = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (typeof data.categories === 'string') data.categories = JSON.parse(data.categories);
  if (typeof data.tags === 'string') data.tags = JSON.parse(data.tags);
  if (req.file) data.featuredImage = req.file.path;
  const blog = await Blog.findByIdAndUpdate(req.params.id, data, { new: true });
  if (!blog) { res.status(404); throw new Error('Blog post not found'); }
  res.json({ success: true, data: blog });
});

const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) { res.status(404); throw new Error('Blog post not found'); }
  res.json({ success: true, message: 'Blog post deleted' });
});

module.exports = { getBlogs, getBlog, createBlog, updateBlog, deleteBlog };
