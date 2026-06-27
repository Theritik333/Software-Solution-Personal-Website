// const express = require('express');
// const router = express.Router();
// const applyCtrl = require('../controllers/applyController');
// const { protect } = require('../middleware/auth');
// const { upload } = require('../config/imagekit');

// router.post('/apply', upload.single('resume'), applyCtrl.submitApplication);
// router.get('/admin/applications', protect, applyCtrl.getAllApplications);
// router.get('/admin/applications/export', protect, applyCtrl.exportApplications);
// router.put('/admin/applications/:id', protect, applyCtrl.updateApplication);
// router.delete('/admin/applications/:id', protect, applyCtrl.deleteApplication);

// module.exports = router;

const express = require('express');
const router  = express.Router();
const applyController = require('../controllers/applyController');
const { protect } = require('../middleware/auth');
const { upload }  = require('../config/imagekit');

// Public — submit application (with resume upload)
router.post('/apply', upload.single('resume'), applyController.submitApplication);

// Protected — admin
router.get ('/admin/applications',            protect, applyController.getAllApplications);
router.get ('/admin/applications/by-career',  protect, applyController.getApplicationsByCareer);
router.get ('/admin/applications/export',     protect, applyController.exportApplications);
router.put ('/admin/applications/:id',        protect, applyController.updateApplication);
router.delete('/admin/applications/:id',      protect, applyController.deleteApplication);

module.exports = router;