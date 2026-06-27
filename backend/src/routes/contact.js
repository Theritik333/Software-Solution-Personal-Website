const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

router.post('/contact', contactController.submitContact);
router.get('/admin/contacts', protect, contactController.getAllContacts);
router.get('/admin/contacts/export', protect, contactController.exportContacts);
router.put('/admin/contacts/:id/read', protect, contactController.markAsRead);
router.delete('/admin/contacts/:id', protect, contactController.deleteContact);

module.exports = router;
