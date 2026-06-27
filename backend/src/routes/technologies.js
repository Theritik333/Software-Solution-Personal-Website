const express = require('express');
const router = express.Router();
const technologyController = require('../controllers/technologyController');
const { protect } = require('../middleware/auth');
const { upload } = require('../config/imagekit');

router.get('/', technologyController.getTechnologies);
router.post('/', protect, upload.single('icon'), technologyController.createTechnology);
router.put('/:id', protect, upload.single('icon'), technologyController.updateTechnology);
router.delete('/:id', protect, technologyController.deleteTechnology);

module.exports = router;
