const mongoose = require('mongoose');

// Single document — always upsert
const settingSchema = new mongoose.Schema(
  {
    companyName: { type: String, default: '' },
    number:      { type: String, default: '' },
    email:       { type: String, default: '' },
    address:     { type: String, default: '' },
    logo: {
      url:    { type: String, default: '' },
      fileId: { type: String, default: '' },
    },
    favicon: {
      url:    { type: String, default: '' },
      fileId: { type: String, default: '' },
    },
    socialLinks: {
      linkedin:  { type: String, default: '' },
      twitter:   { type: String, default: '' },
      instagram: { type: String, default: '' },
      facebook:  { type: String, default: '' },
      github:    { type: String, default: '' },
    },
    metaTitle:       { type: String, default: '' },
    metaDescription: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Setting', settingSchema);
