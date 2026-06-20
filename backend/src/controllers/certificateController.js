const asyncHandler = require('express-async-handler');
const Certificate = require('../models/Certificate');

const getCertificates = asyncHandler(async (req, res) => {
  const filter = req.query.all === 'true' ? {} : { visible: true };
  const certs = await Certificate.find(filter).sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: certs });
});

const createCertificate = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.image = req.file.path;
  const cert = await Certificate.create(data);
  res.status(201).json({ success: true, data: cert });
});

const updateCertificate = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.image = req.file.path;
  const cert = await Certificate.findByIdAndUpdate(req.params.id, data, { new: true });
  if (!cert) { res.status(404); throw new Error('Certificate not found'); }
  res.json({ success: true, data: cert });
});

const deleteCertificate = asyncHandler(async (req, res) => {
  const cert = await Certificate.findByIdAndDelete(req.params.id);
  if (!cert) { res.status(404); throw new Error('Certificate not found'); }
  res.json({ success: true, message: 'Certificate deleted' });
});

module.exports = { getCertificates, createCertificate, updateCertificate, deleteCertificate };
