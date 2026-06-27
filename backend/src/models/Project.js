const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    image: {
      url:    { type: String, required: true },
      fileId: { type: String, required: true },
    },
    category:    { type: String, required: true, trim: true },
    title:       { type: String, required: true, trim: true },
    description: { type: String, required: true },
    keyFeatures: [{ type: String, trim: true }],
    technologies:[{ type: String, trim: true }],
    liveUrl:     { type: String, default: '' },
    githubUrl:   { type: String, default: '' },
    isVisible:   { type: Boolean, default: true },
    order:       { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
