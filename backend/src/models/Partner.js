const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    logo: {
      url:    { type: String, required: true },
      fileId: { type: String, required: true },
    },
    websiteUrl: { type: String, default: '' },
    isVisible:  { type: Boolean, default: true },
    order:      { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Partner', partnerSchema);
