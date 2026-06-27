const ClientReview = require('../models/ClientReview');
const { uploadToImageKit, deleteFromImageKit } = require('../config/imagekit');

const uploadImg = (file, folder) =>
  uploadToImageKit(file.buffer, file.originalname, folder, file.mimetype);

const getReviews = async (req, res, next) => {
  try {
    const filter = req.admin ? {} : { isVisible: true };
    const reviews = await ClientReview.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, reviews });
  } catch (err) { next(err); }
};

const createReview = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'Round image is required' });
    const img = await uploadImg(req.file, '/reviews');
    const review = await ClientReview.create({
      ...req.body,
      roundImage: { url: img.url, fileId: img.fileId },
    });
    res.status(201).json({ success: true, message: 'Review added', review });
  } catch (err) { next(err); }
};

const updateReview = async (req, res, next) => {
  try {
    const review = await ClientReview.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    if (req.file) {
      await deleteFromImageKit(review.roundImage.fileId).catch(() => { });
      const img = await uploadImg(req.file, '/reviews');
      review.roundImage = { url: img.url, fileId: img.fileId };
    }
    Object.assign(review, req.body);
    await review.save();
    res.json({ success: true, message: 'Review updated', review });
  } catch (err) { next(err); }
};

const deleteReview = async (req, res, next) => {
  try {
    const review = await ClientReview.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    await deleteFromImageKit(review.roundImage.fileId).catch(() => { });
    await review.deleteOne();
    res.json({ success: true, message: 'Review deleted' });
  } catch (err) { next(err); }
};

module.exports = {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
};
