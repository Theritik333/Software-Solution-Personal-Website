const Setting = require('../models/Setting');
const { uploadToImageKit, deleteFromImageKit } = require('../config/imagekit');

const upsertSettings = async (req, res, next) => {
  try {
    let setting = await Setting.findOne();
    const body = { ...req.body };
    if (body.socialLinks) body.socialLinks = JSON.parse(body.socialLinks);

    if (req.files?.logo) {
      if (setting?.logo?.fileId) await deleteFromImageKit(setting.logo.fileId).catch(() => { });
      const f = req.files.logo[0];
      const logo = await uploadToImageKit(f.buffer, f.originalname, '/settings', f.mimetype);
      body.logo = { url: logo.url, fileId: logo.fileId };
    }

    if (req.files?.favicon) {
      if (setting?.favicon?.fileId) await deleteFromImageKit(setting.favicon.fileId).catch(() => { });
      const f = req.files.favicon[0];
      const fav = await uploadToImageKit(f.buffer, f.originalname, '/settings', f.mimetype);
      body.favicon = { url: fav.url, fileId: fav.fileId };
    }

    if (setting) {
      Object.assign(setting, body);
      await setting.save();
    } else {
      setting = await Setting.create(body);
    }
    res.json({ success: true, message: 'Settings updated', setting });
  } catch (err) { next(err); }
};

const getSettings = async (req, res, next) => {
  try {
    const setting = await Setting.findOne();
    res.json({ success: true, setting });
  } catch (err) { next(err); }
};

module.exports = {
  getSettings,
  upsertSettings,
};
