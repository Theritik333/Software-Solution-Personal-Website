// const express = require('express');
// const router = express.Router();
// const aboutController = require('../controllers/aboutController');
// const { protect } = require('../middleware/auth');
// const { upload } = require('../config/imagekit');

// router.get('/about', aboutController.getAbout);
// router.put('/admin/about', protect, upload.single('image'), aboutController.upsertAbout);

// module.exports = router;

const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');
const { protect } = require('../middleware/auth');
const { upload } = require('../config/imagekit');

// Public
router.get('/about',     aboutController.getAbout);
router.get('/about/:id', aboutController.getAboutById);

// Protected (admin)
router.post  ('/admin/about',      protect, upload.single('image'), aboutController.createAbout);
router.put   ('/admin/about/:id',  protect, upload.single('image'), aboutController.updateAbout);
router.delete('/admin/about/:id',  protect,                         aboutController.deleteAbout);

module.exports = router;