const express = require('express');
const router = express.Router();
const proj = require('../controllers/projectController');
const { protect } = require('../middleware/auth');
const { upload } = require('../config/imagekit');

router.get('/', proj.getAllProjects);
router.get('/:id', proj.getProject);
router.post('/', protect, upload.single('image'), proj.createProject);
router.put('/:id', protect, upload.single('image'), proj.updateProject);
router.delete('/:id', protect, proj.deleteProject);

module.exports = router;
