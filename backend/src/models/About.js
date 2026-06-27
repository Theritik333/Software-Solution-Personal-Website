const mongoose = require('mongoose');

// Only ONE about document ever — use findOneAndUpdate with upsert
const aboutSchema = new mongoose.Schema(
  {
    image: {
      url:    { type: String, default: '' },
      fileId: { type: String, default: '' },
    },
    title:       { type: String, required: true },
    description: { type: String, required: true },
    mission:     { type: String, default: '' },
    vision:      { type: String, default: '' },
    stats: [
      {
        label: String,
        value: String, // e.g. "200+", "5 Years"
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('About', aboutSchema);
