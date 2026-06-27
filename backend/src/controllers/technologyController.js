const Technology = require('../models/Technology');
const { uploadToImageKit, deleteFromImageKit } = require('../config/imagekit');

const uploadImg = (file, folder) =>
  uploadToImageKit(file.buffer, file.originalname, folder, file.mimetype);

const getTechnologies = async (req, res, next) => {
  try {
    const filter = req.admin ? {} : { isVisible: true };
    const technologies = await Technology.find(filter).sort({ order: 1 });
    res.json({ success: true, technologies });
  } catch (err) { next(err); }
};

const createTechnology = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'Icon is required' });
    const icon = await uploadImg(req.file, '/technologies');
    const benefits = req.body.benefits ? JSON.parse(req.body.benefits) : [];
    const tech = await Technology.create({
      ...req.body,
      icon: { url: icon.url, fileId: icon.fileId },
      benefits,
    });
    res.status(201).json({ success: true, message: 'Technology added', technology: tech });
  } catch (err) { next(err); }
};

const updateTechnology = async (req, res, next) => {
  try {
    const tech = await Technology.findById(req.params.id);
    if (!tech) return res.status(404).json({ success: false, message: 'Technology not found' });
    if (req.file) {
      await deleteFromImageKit(tech.icon.fileId).catch(() => { });
      const icon = await uploadImg(req.file, '/technologies');
      tech.icon = { url: icon.url, fileId: icon.fileId };
    }
    if (req.body.benefits) req.body.benefits = JSON.parse(req.body.benefits);
    Object.assign(tech, req.body);
    await tech.save();
    res.json({ success: true, message: 'Technology updated', technology: tech });
  } catch (err) { next(err); }
};

const deleteTechnology = async (req, res, next) => {
  try {
    const tech = await Technology.findById(req.params.id);
    if (!tech) return res.status(404).json({ success: false, message: 'Technology not found' });
    await deleteFromImageKit(tech.icon.fileId).catch(() => { });
    await tech.deleteOne();
    res.json({ success: true, message: 'Technology deleted' });
  } catch (err) { next(err); }
};

module.exports = {
  getTechnologies,
  createTechnology,
  updateTechnology,
  deleteTechnology,
};
