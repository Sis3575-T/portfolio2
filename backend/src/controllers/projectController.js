const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');

// GET /api/projects
const getProjects = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.visible !== 'all') filter.visible = true;
  if (req.query.featured === 'true') filter.featured = true;
  if (req.query.category) filter.category = req.query.category;

  const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
  res.json({ success: true, count: projects.length, data: projects });
});

// GET /api/projects/:id
const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) { res.status(404); throw new Error('Project not found'); }
  res.json({ success: true, data: project });
});

// POST /api/projects (admin)
const createProject = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (typeof data.technologies === 'string') data.technologies = JSON.parse(data.technologies);
  if (typeof data.highlights === 'string') data.highlights = JSON.parse(data.highlights);
  if (req.files && req.files.length > 0) data.images = req.files.map(f => f.path);
  const project = await Project.create(data);
  res.status(201).json({ success: true, data: project });
});

// PUT /api/projects/:id (admin)
const updateProject = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (typeof data.technologies === 'string') data.technologies = JSON.parse(data.technologies);
  if (typeof data.highlights === 'string') data.highlights = JSON.parse(data.highlights);
  if (req.files && req.files.length > 0) data.images = req.files.map(f => f.path);
  const project = await Project.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  if (!project) { res.status(404); throw new Error('Project not found'); }
  res.json({ success: true, data: project });
});

// DELETE /api/projects/:id (admin)
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) { res.status(404); throw new Error('Project not found'); }
  res.json({ success: true, message: 'Project deleted' });
});

// PUT /api/projects/reorder (admin)
const reorderProjects = asyncHandler(async (req, res) => {
  const { orders } = req.body; // [{ id, order }]
  await Promise.all(orders.map(({ id, order }) => Project.findByIdAndUpdate(id, { order })));
  res.json({ success: true, message: 'Projects reordered' });
});

module.exports = { getProjects, getProject, createProject, updateProject, deleteProject, reorderProjects };
