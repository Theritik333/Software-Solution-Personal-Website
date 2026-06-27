const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { upload } = require('../config/imagekit');

router.post('/seed', auth.seedAdmin);
router.post('/login', auth.login);
router.post('/logout', protect, auth.logout);
router.get('/me', protect, auth.getMe);
router.put('/profile', protect, upload.single('profileImage'), auth.updateProfile);

module.exports = router;
