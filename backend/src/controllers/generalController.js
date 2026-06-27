// const Partner       = require('../models/Partner');
// const Service       = require('../models/Service');
// const Technology    = require('../models/Technology');
// const ClientReview  = require('../models/ClientReview');
// const About         = require('../models/About');
// const Career        = require('../models/Career');
// const PrivacyPolicy = require('../models/PrivacyPolicy');
// const Setting       = require('../models/Setting');
// const { uploadToImageKit, deleteFromImageKit } = require('../config/imagekit');

// // ─── HELPER ────────────────────────────────────────────────────────────────
// const uploadImg = (file, folder) =>
//   uploadToImageKit(file.buffer, file.originalname, folder, file.mimetype);

// // ═══════════════════════════════════════════════════════════════════════════
// // PARTNERS
// // ═══════════════════════════════════════════════════════════════════════════
// const getPartners = async (req, res, next) => {
//   try {
//     const filter = req.admin ? {} : { isVisible: true };
//     const partners = await Partner.find(filter).sort({ order: 1 });
//     res.json({ success: true, partners });
//   } catch (err) { next(err); }
// };

// const createPartner = async (req, res, next) => {
//   try {
//     if (!req.file) return res.status(400).json({ success: false, message: 'Logo is required' });
//     const logo = await uploadImg(req.file, '/partners');
//     const partner = await Partner.create({ ...req.body, logo: { url: logo.url, fileId: logo.fileId } });
//     res.status(201).json({ success: true, message: 'Partner added', partner });
//   } catch (err) { next(err); }
// };

// const updatePartner = async (req, res, next) => {
//   try {
//     const partner = await Partner.findById(req.params.id);
//     if (!partner) return res.status(404).json({ success: false, message: 'Partner not found' });
//     if (req.file) {
//       await deleteFromImageKit(partner.logo.fileId).catch(() => {});
//       const logo = await uploadImg(req.file, '/partners');
//       partner.logo = { url: logo.url, fileId: logo.fileId };
//     }
//     Object.assign(partner, req.body);
//     await partner.save();
//     res.json({ success: true, message: 'Partner updated', partner });
//   } catch (err) { next(err); }
// };

// const deletePartner = async (req, res, next) => {
//   try {
//     const partner = await Partner.findById(req.params.id);
//     if (!partner) return res.status(404).json({ success: false, message: 'Partner not found' });
//     await deleteFromImageKit(partner.logo.fileId).catch(() => {});
//     await partner.deleteOne();
//     res.json({ success: true, message: 'Partner deleted' });
//   } catch (err) { next(err); }
// };

// // ═══════════════════════════════════════════════════════════════════════════
// // SERVICES
// // ═══════════════════════════════════════════════════════════════════════════
// const getServices = async (req, res, next) => {
//   try {
//     const filter = req.admin ? {} : { isVisible: true };
//     const services = await Service.find(filter).sort({ order: 1 });
//     res.json({ success: true, services });
//   } catch (err) { next(err); }
// };

// const createService = async (req, res, next) => {
//   try {
//     if (!req.file) return res.status(400).json({ success: false, message: 'Icon is required' });
//     const icon = await uploadImg(req.file, '/services');
//     const { title, description, order } = req.body;
//     const points = req.body.points ? JSON.parse(req.body.points) : [];
//     const service = await Service.create({ icon: { url: icon.url, fileId: icon.fileId }, title, description, points, order });
//     res.status(201).json({ success: true, message: 'Service created', service });
//   } catch (err) { next(err); }
// };

// const updateService = async (req, res, next) => {
//   try {
//     const service = await Service.findById(req.params.id);
//     if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
//     if (req.file) {
//       await deleteFromImageKit(service.icon.fileId).catch(() => {});
//       const icon = await uploadImg(req.file, '/services');
//       service.icon = { url: icon.url, fileId: icon.fileId };
//     }
//     if (req.body.points) req.body.points = JSON.parse(req.body.points);
//     Object.assign(service, req.body);
//     await service.save();
//     res.json({ success: true, message: 'Service updated', service });
//   } catch (err) { next(err); }
// };

// const deleteService = async (req, res, next) => {
//   try {
//     const service = await Service.findById(req.params.id);
//     if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
//     await deleteFromImageKit(service.icon.fileId).catch(() => {});
//     await service.deleteOne();
//     res.json({ success: true, message: 'Service deleted' });
//   } catch (err) { next(err); }
// };

// // ═══════════════════════════════════════════════════════════════════════════
// // TECHNOLOGIES
// // ═══════════════════════════════════════════════════════════════════════════
// const getTechnologies = async (req, res, next) => {
//   try {
//     const filter = req.admin ? {} : { isVisible: true };
//     const technologies = await Technology.find(filter).sort({ order: 1 });
//     res.json({ success: true, technologies });
//   } catch (err) { next(err); }
// };

// const createTechnology = async (req, res, next) => {
//   try {
//     if (!req.file) return res.status(400).json({ success: false, message: 'Icon is required' });
//     const icon = await uploadImg(req.file, '/technologies');
//     const benefits = req.body.benefits ? JSON.parse(req.body.benefits) : [];
//     const tech = await Technology.create({
//       ...req.body,
//       icon: { url: icon.url, fileId: icon.fileId },
//       benefits,
//     });
//     res.status(201).json({ success: true, message: 'Technology added', technology: tech });
//   } catch (err) { next(err); }
// };

// const updateTechnology = async (req, res, next) => {
//   try {
//     const tech = await Technology.findById(req.params.id);
//     if (!tech) return res.status(404).json({ success: false, message: 'Technology not found' });
//     if (req.file) {
//       await deleteFromImageKit(tech.icon.fileId).catch(() => {});
//       const icon = await uploadImg(req.file, '/technologies');
//       tech.icon = { url: icon.url, fileId: icon.fileId };
//     }
//     if (req.body.benefits) req.body.benefits = JSON.parse(req.body.benefits);
//     Object.assign(tech, req.body);
//     await tech.save();
//     res.json({ success: true, message: 'Technology updated', technology: tech });
//   } catch (err) { next(err); }
// };

// const deleteTechnology = async (req, res, next) => {
//   try {
//     const tech = await Technology.findById(req.params.id);
//     if (!tech) return res.status(404).json({ success: false, message: 'Technology not found' });
//     await deleteFromImageKit(tech.icon.fileId).catch(() => {});
//     await tech.deleteOne();
//     res.json({ success: true, message: 'Technology deleted' });
//   } catch (err) { next(err); }
// };

// // ═══════════════════════════════════════════════════════════════════════════
// // CLIENT REVIEWS
// // ═══════════════════════════════════════════════════════════════════════════
// const getReviews = async (req, res, next) => {
//   try {
//     const filter = req.admin ? {} : { isVisible: true };
//     const reviews = await ClientReview.find(filter).sort({ createdAt: -1 });
//     res.json({ success: true, reviews });
//   } catch (err) { next(err); }
// };

// const createReview = async (req, res, next) => {
//   try {
//     if (!req.file) return res.status(400).json({ success: false, message: 'Round image is required' });
//     const img = await uploadImg(req.file, '/reviews');
//     const review = await ClientReview.create({
//       ...req.body,
//       roundImage: { url: img.url, fileId: img.fileId },
//     });
//     res.status(201).json({ success: true, message: 'Review added', review });
//   } catch (err) { next(err); }
// };

// const updateReview = async (req, res, next) => {
//   try {
//     const review = await ClientReview.findById(req.params.id);
//     if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
//     if (req.file) {
//       await deleteFromImageKit(review.roundImage.fileId).catch(() => {});
//       const img = await uploadImg(req.file, '/reviews');
//       review.roundImage = { url: img.url, fileId: img.fileId };
//     }
//     Object.assign(review, req.body);
//     await review.save();
//     res.json({ success: true, message: 'Review updated', review });
//   } catch (err) { next(err); }
// };

// const deleteReview = async (req, res, next) => {
//   try {
//     const review = await ClientReview.findById(req.params.id);
//     if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
//     await deleteFromImageKit(review.roundImage.fileId).catch(() => {});
//     await review.deleteOne();
//     res.json({ success: true, message: 'Review deleted' });
//   } catch (err) { next(err); }
// };

// // ═══════════════════════════════════════════════════════════════════════════
// // ABOUT (single document)
// // ═══════════════════════════════════════════════════════════════════════════
// const getAbout = async (req, res, next) => {
//   try {
//     const about = await About.findOne();
//     res.json({ success: true, about });
//   } catch (err) { next(err); }
// };

// const upsertAbout = async (req, res, next) => {
//   try {
//     let about = await About.findOne();
//     const body = { ...req.body };
//     if (body.stats) body.stats = JSON.parse(body.stats);

//     if (req.file) {
//       if (about?.image?.fileId) await deleteFromImageKit(about.image.fileId).catch(() => {});
//       const img = await uploadImg(req.file, '/about');
//       body.image = { url: img.url, fileId: img.fileId };
//     }

//     if (about) {
//       Object.assign(about, body);
//       await about.save();
//     } else {
//       about = await About.create(body);
//     }
//     res.json({ success: true, message: 'About updated', about });
//   } catch (err) { next(err); }
// };

// // ═══════════════════════════════════════════════════════════════════════════
// // CAREERS
// // ═══════════════════════════════════════════════════════════════════════════
// const getCareers = async (req, res, next) => {
//   try {
//     const filter = req.admin ? {} : { isActive: true };
//     const careers = await Career.find(filter).sort({ createdAt: -1 });
//     res.json({ success: true, careers });
//   } catch (err) { next(err); }
// };

// const createCareer = async (req, res, next) => {
//   try {
//     const body = { ...req.body };
//     if (body.requirements)   body.requirements   = JSON.parse(body.requirements);
//     if (body.mustHaveSkills) body.mustHaveSkills = JSON.parse(body.mustHaveSkills);
//     const career = await Career.create(body);
//     res.status(201).json({ success: true, message: 'Career posted', career });
//   } catch (err) { next(err); }
// };

// const updateCareer = async (req, res, next) => {
//   try {
//     const body = { ...req.body };
//     if (body.requirements)   body.requirements   = JSON.parse(body.requirements);
//     if (body.mustHaveSkills) body.mustHaveSkills = JSON.parse(body.mustHaveSkills);
//     const career = await Career.findByIdAndUpdate(req.params.id, body, { new: true, runValidators: true });
//     if (!career) return res.status(404).json({ success: false, message: 'Career not found' });
//     res.json({ success: true, message: 'Career updated', career });
//   } catch (err) { next(err); }
// };

// const deleteCareer = async (req, res, next) => {
//   try {
//     await Career.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: 'Career deleted' });
//   } catch (err) { next(err); }
// };

// // ═══════════════════════════════════════════════════════════════════════════
// // PRIVACY POLICY (single document)
// // ═══════════════════════════════════════════════════════════════════════════
// const getPrivacyPolicy = async (req, res, next) => {
//   try {
//     const policy = await PrivacyPolicy.findOne();
//     res.json({ success: true, policy });
//   } catch (err) { next(err); }
// };

// const upsertPrivacyPolicy = async (req, res, next) => {
//   try {
//     let policy = await PrivacyPolicy.findOne();
//     if (policy) {
//       Object.assign(policy, req.body, { lastUpdated: new Date() });
//       await policy.save();
//     } else {
//       policy = await PrivacyPolicy.create(req.body);
//     }
//     res.json({ success: true, message: 'Privacy policy updated', policy });
//   } catch (err) { next(err); }
// };

// // ═══════════════════════════════════════════════════════════════════════════
// // SETTINGS (single document)
// // ═══════════════════════════════════════════════════════════════════════════
// const getSettings = async (req, res, next) => {
//   try {
//     const setting = await Setting.findOne();
//     res.json({ success: true, setting });
//   } catch (err) { next(err); }
// };

// const upsertSettings = async (req, res, next) => {
//   try {
//     let setting = await Setting.findOne();
//     const body = { ...req.body };
//     if (body.socialLinks) body.socialLinks = JSON.parse(body.socialLinks);

//     // Handle logo upload
//     if (req.files?.logo) {
//       if (setting?.logo?.fileId) await deleteFromImageKit(setting.logo.fileId).catch(() => {});
//       const f = req.files.logo[0];
//       const logo = await uploadToImageKit(f.buffer, f.originalname, '/settings', f.mimetype);
//       body.logo = { url: logo.url, fileId: logo.fileId };
//     }

//     // Handle favicon upload
//     if (req.files?.favicon) {
//       if (setting?.favicon?.fileId) await deleteFromImageKit(setting.favicon.fileId).catch(() => {});
//       const f = req.files.favicon[0];
//       const fav = await uploadToImageKit(f.buffer, f.originalname, '/settings', f.mimetype);
//       body.favicon = { url: fav.url, fileId: fav.fileId };
//     }

//     if (setting) {
//       Object.assign(setting, body);
//       await setting.save();
//     } else {
//       setting = await Setting.create(body);
//     }
//     res.json({ success: true, message: 'Settings updated', setting });
//   } catch (err) { next(err); }
// };

// module.exports = {
//   // Partners
//   getPartners, createPartner, updatePartner, deletePartner,
//   // Services
//   getServices, createService, updateService, deleteService,
//   // Technologies
//   getTechnologies, createTechnology, updateTechnology, deleteTechnology,
//   // Reviews
//   getReviews, createReview, updateReview, deleteReview,
//   // About
//   getAbout, upsertAbout,
//   // Careers
//   getCareers, createCareer, updateCareer, deleteCareer,
//   // Privacy Policy
//   getPrivacyPolicy, upsertPrivacyPolicy,
//   // Settings
//   getSettings, upsertSettings,
// };
