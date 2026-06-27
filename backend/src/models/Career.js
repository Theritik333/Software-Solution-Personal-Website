const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema(
  {
    role:           { type: String, required: true, trim: true },
    location:       { type: String, required: true, trim: true },
    jobDescription: { type: String, required: true },
    requirements:   [{ type: String, trim: true }],
    mustHaveSkills: [{ type: String, trim: true }],
    jobType: {
      type:    String,
      enum:    ['full-time', 'part-time', 'contract', 'internship', 'remote'],
      default: 'full-time',
    },
    experienceLevel: {
      type:    String,
      enum:    ['fresher', 'junior', 'mid', 'senior'],
      default: 'junior',
    },
    salary:    { type: String, default: '' }, // e.g. "5-8 LPA"
    isActive:  { type: Boolean, default: true },
    lastDate:  { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Career', careerSchema);
