const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name:         { type: String, required: true, trim: true },
    email:        { type: String, required: true, lowercase: true, trim: true },
    countryCode:  { type: String, default: '+91' },
    phoneNumber:  { type: String, required: true, trim: true },
    businessName: { type: String, default: '', trim: true },
    serviceNeeded:{ type: String, default: '', trim: true }, // dropdown value
    message:      { type: String, required: true },
    isRead:       { type: Boolean, default: false },
    isReplied:    { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
