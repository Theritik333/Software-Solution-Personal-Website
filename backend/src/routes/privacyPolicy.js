const express = require('express');
const router = express.Router();
const privacyController = require('../controllers/privacyPolicyController');
const { protect } = require('../middleware/auth');

router.get('/privacy-policy', privacyController.getPrivacyPolicy);
router.put('/privacy-policy', protect, privacyController.upsertPrivacyPolicy);

module.exports = router;
