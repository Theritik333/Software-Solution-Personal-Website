const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    icon: {
      url:    { type: String, required: true },
      fileId: { type: String, required: true },
    },
    title:       { type: String, required: true, trim: true },
    description: { type: String, required: true },
    points:      [{ type: String, trim: true }], // bullet points from your sheet
    isVisible:   { type: Boolean, default: true },
    order:       { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
