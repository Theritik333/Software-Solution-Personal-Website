const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');
const { protect } = require('../middleware/auth');

router.get('/', careerController.getCareers);
router.post('/', protect, careerController.createCareer);
router.put('/:id', protect, careerController.updateCareer);
router.delete('/:id', protect, careerController.deleteCareer);

module.exports = router;

// const express = require('express');
// const router  = express.Router();
// const careerController = require('../controllers/careerController');
// const { protect } = require('../middleware/auth');

// // Public
// router.get('/careers',     careerController.getCareers);
// router.get('/careers/:id', careerController.getCareerById);

// // Protected
// router.post  ('/admin/careers',      protect, careerController.createCareer);
// router.put   ('/admin/careers/:id',  protect, careerController.updateCareer);
// router.delete('/admin/careers/:id',  protect, careerController.deleteCareer);

// module.exports = router;