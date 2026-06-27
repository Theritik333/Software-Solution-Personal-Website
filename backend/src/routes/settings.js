const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const { protect } = require('../middleware/auth');
const { upload } = require('../config/imagekit');

router.get('/settings', settingsController.getSettings);
router.put('/settings', protect, upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'favicon', maxCount: 1 },
]), settingsController.upsertSettings);

module.exports = router;
