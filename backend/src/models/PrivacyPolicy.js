const mongoose = require('mongoose');

// Single document — upsert on update
const privacyPolicySchema = new mongoose.Schema(
  {
    title:       { type: String, required: true },
    description: { type: String, required: true }, // rich text / HTML from editor
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PrivacyPolicy', privacyPolicySchema);
