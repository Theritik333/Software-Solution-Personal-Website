const mongoose = require('mongoose');

const technologySchema = new mongoose.Schema(
  {
    icon: {
      url:    { type: String, required: true },
      fileId: { type: String, required: true },
    },
    title:    { type: String, required: true, trim: true },
    benefits: [{ type: String, trim: true }],
    docsLink: { type: String, default: '' },
    category: {
      type:    String,
      enum:    ['frontend', 'backend', 'database', 'devops', 'mobile', 'other'],
      default: 'other',
    },
    isVisible:{ type: Boolean, default: true },
    order:    { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Technology', technologySchema);
