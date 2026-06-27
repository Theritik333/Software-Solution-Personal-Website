// const About = require('../models/About');
// const { uploadToImageKit, deleteFromImageKit } = require('../config/imagekit');

// const uploadImg = (file, folder) =>
//   uploadToImageKit(file.buffer, file.originalname, folder, file.mimetype);

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
//       if (about?.image?.fileId) await deleteFromImageKit(about.image.fileId).catch(() => { });
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

// module.exports = {
//   getAbout,
//   upsertAbout,
// };

const About = require('../models/About');
const { uploadToImageKit, deleteFromImageKit } = require('../config/imagekit');

const uploadImg = (file, folder) =>
  uploadToImageKit(file.buffer, file.originalname, folder);

// GET /api/about  (public - all sections)
const getAbout = async (req, res, next) => {
  try {
    const abouts = await About.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, abouts });
  } catch (err) { next(err); }
};

// GET /api/about/:id
const getAboutById = async (req, res, next) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about) return res.status(404).json({ success: false, message: 'About section not found' });
    res.json({ success: true, about });
  } catch (err) { next(err); }
};

// POST /api/admin/about  (create new section)
const createAbout = async (req, res, next) => {
  try {
    const body = { ...req.body };
    if (body.stats) body.stats = JSON.parse(body.stats);

    if (req.file) {
      const img = await uploadImg(req.file, '/about');
      body.image = { url: img.url, fileId: img.fileId };
    }

    const about = await About.create(body);
    res.status(201).json({ success: true, message: 'About section created', about });
  } catch (err) { next(err); }
};

// PUT /api/admin/about/:id  (update specific section)
const updateAbout = async (req, res, next) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about) return res.status(404).json({ success: false, message: 'About section not found' });

    const body = { ...req.body };
    if (body.stats) body.stats = JSON.parse(body.stats);

    if (req.file) {
      // delete old image from imagekit
      if (about.image?.fileId) await deleteFromImageKit(about.image.fileId).catch(() => {});
      const img = await uploadImg(req.file, '/about');
      body.image = { url: img.url, fileId: img.fileId };
    }

    Object.assign(about, body);
    await about.save();
    res.json({ success: true, message: 'About section updated', about });
  } catch (err) { next(err); }
};

// DELETE /api/admin/about/:id
const deleteAbout = async (req, res, next) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about) return res.status(404).json({ success: false, message: 'About section not found' });

    if (about.image?.fileId) await deleteFromImageKit(about.image.fileId).catch(() => {});
    await about.deleteOne();

    res.json({ success: true, message: 'About section deleted' });
  } catch (err) { next(err); }
};

module.exports = { getAbout, getAboutById, createAbout, updateAbout, deleteAbout };