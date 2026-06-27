const mongoose = require('mongoose');

const clientReviewSchema = new mongoose.Schema(
  {
    roundImage: {
      url:    { type: String, required: true },
      fileId: { type: String, required: true },
    },
    name:   { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: {
      type:      String,
      required:  true,
      minlength: [100, 'Review must be at least 100 words'],
      maxlength: [2500, 'Review must be under 500 words'], // ~500 words avg 5 chars
    },
    designation: { type: String, default: '', trim: true },
    company:     { type: String, default: '', trim: true },
    isVisible:   { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ClientReview', clientReviewSchema);
