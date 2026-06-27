const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { protect } = require('../middleware/auth');
const { upload } = require('../config/imagekit');

router.get('/', serviceController.getServices);
router.post('/', protect, upload.single('icon'), serviceController.createService);
router.put('/:id', protect, upload.single('icon'), serviceController.updateService);
router.delete('/:id', protect, serviceController.deleteService);

module.exports = router;
