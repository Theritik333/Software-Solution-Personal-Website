const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const projectRoutes = require('./projects');
const partnerRoutes = require('./partners');
const serviceRoutes = require('./services');
const technologyRoutes = require('./technologies');
const reviewRoutes = require('./reviews');
const aboutRoutes = require('./about');
const contactRoutes = require('./contact');
const applyRoutes = require('./apply');
const careerRoutes = require('./careers');
const privacyRoutes = require('./privacyPolicy');
const settingsRoutes = require('./settings');
const dashboardRoutes = require('./dashboard');

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/partners', partnerRoutes);
router.use('/services', serviceRoutes);
router.use('/technologies', technologyRoutes);
router.use('/reviews', reviewRoutes);
router.use('/careers', careerRoutes);
router.use('/', aboutRoutes);
router.use('/', contactRoutes);
router.use('/', applyRoutes);
router.use('/', privacyRoutes);
router.use('/', settingsRoutes);
router.use('/', dashboardRoutes);

module.exports = router;
