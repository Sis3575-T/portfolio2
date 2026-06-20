const asyncHandler = require('express-async-handler');
const Testimonial = require('../models/Testimonial');

const getTestimonials = asyncHandler(async (req, res) => {
  const filter = req.query.all === 'true' ? {} : { visible: true };
  const testimonials = await Testimonial.find(filter).sort({ order: 1 });
  res.json({ success: true, data: testimonials });
});

const createTestimonial = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.image = req.file.path;
  const testimonial = await Testimonial.create(data);
  res.status(201).json({ success: true, data: testimonial });
});

const updateTestimonial = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.image = req.file.path;
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, data, { new: true });
  if (!testimonial) { res.status(404); throw new Error('Testimonial not found'); }
  res.json({ success: true, data: testimonial });
});

const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) { res.status(404); throw new Error('Testimonial not found'); }
  res.json({ success: true, message: 'Testimonial deleted' });
});

module.exports = { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial };
