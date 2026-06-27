const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');
const { upload } = require('../config/imagekit');

router.get('/', reviewController.getReviews);
router.post('/', protect, upload.single('roundImage'), reviewController.createReview);
router.put('/:id', protect, upload.single('roundImage'), reviewController.updateReview);
router.delete('/:id', protect, reviewController.deleteReview);

module.exports = router;
