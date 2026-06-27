const Partner = require('../models/Partner');
const { uploadToImageKit, deleteFromImageKit } = require('../config/imagekit');

const uploadImg = (file, folder) =>
  uploadToImageKit(file.buffer, file.originalname, folder, file.mimetype);

const getPartners = async (req, res, next) => {
  try {
    const filter = req.admin ? {} : { isVisible: true };
    const partners = await Partner.find(filter).sort({ order: 1 });
    res.json({ success: true, partners });
  } catch (err) { next(err); }
};

const createPartner = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'Logo is required' });
    const logo = await uploadImg(req.file, '/partners');
    const partner = await Partner.create({ ...req.body, logo: { url: logo.url, fileId: logo.fileId } });
    res.status(201).json({ success: true, message: 'Partner added', partner });
  } catch (err) { next(err); }
};

const updatePartner = async (req, res, next) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) return res.status(404).json({ success: false, message: 'Partner not found' });
    if (req.file) {
      await deleteFromImageKit(partner.logo.fileId).catch(() => { });
      const logo = await uploadImg(req.file, '/partners');
      partner.logo = { url: logo.url, fileId: logo.fileId };
    }
    Object.assign(partner, req.body);
    await partner.save();
    res.json({ success: true, message: 'Partner updated', partner });
  } catch (err) { next(err); }
};

const deletePartner = async (req, res, next) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) return res.status(404).json({ success: false, message: 'Partner not found' });
    await deleteFromImageKit(partner.logo.fileId).catch(() => { });
    await partner.deleteOne();
    res.json({ success: true, message: 'Partner deleted' });
  } catch (err) { next(err); }
};

module.exports = {
  getPartners,
  createPartner,
  updatePartner,
  deletePartner,
};
