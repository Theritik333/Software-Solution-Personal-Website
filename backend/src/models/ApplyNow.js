// const mongoose = require('mongoose');

// const applyNowSchema = new mongoose.Schema(
//   {
//     name:    { type: String, required: true, trim: true },
//     email:   { type: String, required: true, lowercase: true, trim: true },
//     number:  { type: String, required: true, trim: true },
//     resume: {
//       url:    { type: String, required: true }, // ImageKit URL (PDF/DOC)
//       fileId: { type: String, required: true },
//       name:   { type: String },
//     },
//     message:    { type: String, default: '' },
//     applyingFor:{ type: String, default: '' }, // job title they applied for
//     isRead:     { type: Boolean, default: false },
//     status: {
//       type:    String,
//       enum:    ['pending', 'reviewed', 'shortlisted', 'rejected'],
//       default: 'pending',
//     },
    
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('ApplyNow', applyNowSchema);


// const mongoose = require("mongoose");

// const applyNowSchema = new mongoose.Schema(
//   {
//     // ── Relation to Career ──────────────────────────────
//     careerId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Career",
//       default: null, // null = general application
//     },
//     careerRole: {
//       type: String,
//       default: "", // snapshot of role at time of apply (in case career deleted)
//     },

//     // ── Applicant Info ──────────────────────────────────
//     name:   { type: String, required: true, trim: true },
//     email:  { type: String, required: true, lowercase: true, trim: true },
//     number: { type: String, required: true, trim: true },

//     resume: {
//       url:    { type: String, required: true },
//       fileId: { type: String, required: true },
//       name:   { type: String },
//     },

//     message:     { type: String, default: "" },
//     isRead:      { type: Boolean, default: false },
//     status: {
//       type:    String,
//       enum:    ["pending", "reviewed", "shortlisted", "rejected"],
//       default: "pending",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("ApplyNow", applyNowSchema);



// models/ApplyNow.js

const mongoose = require("mongoose");

const applyNowSchema = new mongoose.Schema(
  {
    // ─────────────────────────────────────
    // Career Relation
    // ─────────────────────────────────────
    careerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Career",
      default: null,
    },

    // Snapshot Role
    applyingFor: {
      type: String,
      default: "General Application",
    },

    // ─────────────────────────────────────
    // Applicant Details
    // ─────────────────────────────────────
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    number: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      default: "",
    },

    // ─────────────────────────────────────
    // Resume
    // ─────────────────────────────────────
    resume: {
      url: {
        type: String,
        required: true,
      },

      fileId: {
        type: String,
        required: true,
      },

      name: {
        type: String,
      },
    },

    // ─────────────────────────────────────
    // Admin
    // ─────────────────────────────────────
    isRead: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "reviewed",
        "shortlisted",
        "rejected",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ApplyNow",
  applyNowSchema
);