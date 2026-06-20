const express = require('express');
const router = express.Router();
const { getCertificates, createCertificate, updateCertificate, deleteCertificate } = require('../controllers/certificateController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getCertificates);
router.post('/', protect, adminOnly, upload.single('image'), createCertificate);
router.put('/:id', protect, adminOnly, upload.single('image'), updateCertificate);
router.delete('/:id', protect, adminOnly, deleteCertificate);

module.exports = router;
