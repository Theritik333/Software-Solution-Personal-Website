const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partnerController');
const { protect } = require('../middleware/auth');
const { upload } = require('../config/imagekit');

router.get('/', partnerController.getPartners);
router.post('/', protect, upload.single('logo'), partnerController.createPartner);
router.put('/:id', protect, upload.single('logo'), partnerController.updatePartner);
router.delete('/:id', protect, partnerController.deletePartner);

module.exports = router;
