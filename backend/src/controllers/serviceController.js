const Service = require('../models/Service');
const { uploadToImageKit, deleteFromImageKit } = require('../config/imagekit');

const uploadImg = (file, folder) =>
  uploadToImageKit(file.buffer, file.originalname, folder, file.mimetype);

const getServices = async (req, res, next) => {
  try {
    const filter = req.admin ? {} : { isVisible: true };
    const services = await Service.find(filter).sort({ order: 1 });
    res.json({ success: true, services });
  } catch (err) { next(err); }
};

const createService = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'Icon is required' });
    const icon = await uploadImg(req.file, '/services');
    const { title, description, order } = req.body;
    const points = req.body.points ? JSON.parse(req.body.points) : [];
    const service = await Service.create({ icon: { url: icon.url, fileId: icon.fileId }, title, description, points, order });
    res.status(201).json({ success: true, message: 'Service created', service });
  } catch (err) { next(err); }
};

const updateService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    if (req.file) {
      await deleteFromImageKit(service.icon.fileId).catch(() => { });
      const icon = await uploadImg(req.file, '/services');
      service.icon = { url: icon.url, fileId: icon.fileId };
    }
    if (req.body.points) req.body.points = JSON.parse(req.body.points);
    Object.assign(service, req.body);
    await service.save();
    res.json({ success: true, message: 'Service updated', service });
  } catch (err) { next(err); }
};

const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    await deleteFromImageKit(service.icon.fileId).catch(() => { });
    await service.deleteOne();
    res.json({ success: true, message: 'Service deleted' });
  } catch (err) { next(err); }
};

module.exports = {
  getServices,
  createService,
  updateService,
  deleteService,
};
