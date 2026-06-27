// // const ApplyNow = require('../models/ApplyNow');
// // const { uploadToImageKit, deleteFromImageKit } = require('../config/imagekit');
// // const { exportToExcel } = require('../utils/exportExcel');

// // // @POST /api/apply  (public)
// // const submitApplication = async (req, res, next) => {
// //   try {
// //     if (!req.file) return res.status(400).json({ success: false, message: 'Resume is required' });

// //     const resumeResult = await uploadToImageKit(
// //       req.file.buffer, req.file.originalname, '/resumes', req.file.mimetype
// //     );

// //     const { name, email, number, message, applyingFor } = req.body;
// //     if (!name || !email || !number)
// //       return res.status(400).json({ success: false, message: 'Name, email and number are required' });

// //     const application = await ApplyNow.create({
// //       name, email, number, message, applyingFor,
// //       resume: { url: resumeResult.url, fileId: resumeResult.fileId, name: req.file.originalname },
// //     });

// //     res.status(201).json({ success: true, message: 'Application submitted successfully', application });
// //   } catch (err) { next(err); }
// // };

// // // @GET /api/admin/applications  (protected)
// // const getAllApplications = async (req, res, next) => {
// //   try {
// //     const { status, page = 1, limit = 20 } = req.query;
// //     const filter = {};
// //     if (status) filter.status = status;

// //     const applications = await ApplyNow.find(filter)
// //       .sort({ createdAt: -1 })
// //       .skip((page - 1) * limit)
// //       .limit(Number(limit));

// //     const total  = await ApplyNow.countDocuments(filter);
// //     const unread = await ApplyNow.countDocuments({ isRead: false });

// //     res.json({ success: true, total, unread, page: Number(page), applications });
// //   } catch (err) { next(err); }
// // };

// // // @PUT /api/admin/applications/:id  (update status / mark read)
// // const updateApplication = async (req, res, next) => {
// //   try {
// //     const app = await ApplyNow.findByIdAndUpdate(req.params.id, req.body, { new: true });
// //     if (!app) return res.status(404).json({ success: false, message: 'Application not found' });
// //     res.json({ success: true, message: 'Application updated', application: app });
// //   } catch (err) { next(err); }
// // };

// // // @DELETE /api/admin/applications/:id  (protected)
// // const deleteApplication = async (req, res, next) => {
// //   try {
// //     const app = await ApplyNow.findById(req.params.id);
// //     if (!app) return res.status(404).json({ success: false, message: 'Application not found' });
// //     await deleteFromImageKit(app.resume.fileId).catch(() => {});
// //     await app.deleteOne();
// //     res.json({ success: true, message: 'Application deleted' });
// //   } catch (err) { next(err); }
// // };

// // // @GET /api/admin/applications/export  (bulk Excel download)
// // const exportApplications = async (req, res, next) => {
// //   try {
// //     const applications = await ApplyNow.find().sort({ createdAt: -1 });

// //     const data = applications.map((a, i) => ({
// //       'S.No':         i + 1,
// //       'Name':         a.name,
// //       'Email':        a.email,
// //       'Phone':        a.number,
// //       'Applying For': a.applyingFor || '-',
// //       'Message':      a.message    || '-',
// //       'Resume URL':   a.resume.url,
// //       'Status':       a.status,
// //       'Read':         a.isRead ? 'Yes' : 'No',
// //       'Applied On':   new Date(a.createdAt).toLocaleString('en-IN'),
// //     }));

// //     exportToExcel(res, data, 'Applications', 'apply-now-queries');
// //   } catch (err) { next(err); }
// // };

// // module.exports = { submitApplication, getAllApplications, updateApplication, deleteApplication, exportApplications };


// const ApplyNow = require('../models/ApplyNow');
// const Career   = require('../models/Career');
// const { uploadToImageKit, deleteFromImageKit } = require('../config/imagekit');
// const { exportToExcel } = require('../utils/exportExcel');

// // POST /api/apply  (public — with optional careerId)
// const submitApplication = async (req, res, next) => {
//   try {
//     if (!req.file)
//       return res.status(400).json({ success: false, message: 'Resume is required' });

//     const { name, email, number, message, careerId } = req.body;
//     if (!name || !email || !number)
//       return res.status(400).json({ success: false, message: 'Name, email and number are required' });

//     // Upload resume to ImageKit
//     const resumeResult = await uploadToImageKit(
//       req.file.buffer, req.file.originalname, '/resumes'
//     );

//     // If careerId given — verify it exists and snapshot the role
//     let careerRole = '';
//     let validCareerId = null;
//     if (careerId) {
//       const career = await Career.findById(careerId);
//       if (career) {
//         careerRole    = career.role;
//         validCareerId = career._id;
//       }
//     }

//     const application = await ApplyNow.create({
//       careerId:   validCareerId,
//       careerRole,
//       name, email, number, message,
//       resume: {
//         url:    resumeResult.url,
//         fileId: resumeResult.fileId,
//         name:   req.file.originalname,
//       },
//     });

//     res.status(201).json({
//       success: true,
//       message: 'Application submitted successfully',
//       application,
//     });
//   } catch (err) { next(err); }
// };

// // GET /api/admin/applications  (protected)
// const getAllApplications = async (req, res, next) => {
//   try {
//     const { status, careerId, page = 1, limit = 15 } = req.query;
//     const filter = {};
//     if (status)   filter.status   = status;
//     if (careerId) filter.careerId = careerId;

//     const applications = await ApplyNow.find(filter)
//       .populate('careerId', 'role location jobType') // join career data
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(Number(limit));

//     const total  = await ApplyNow.countDocuments(filter);
//     const unread = await ApplyNow.countDocuments({ isRead: false });

//     res.json({ success: true, total, unread, page: Number(page), applications });
//   } catch (err) { next(err); }
// };

// // GET /api/admin/applications/by-career  — grouped count per career
// const getApplicationsByCareer = async (req, res, next) => {
//   try {
//     const grouped = await ApplyNow.aggregate([
//       {
//         $group: {
//           _id:   '$careerId',
//           count: { $sum: 1 },
//           role:  { $first: '$careerRole' },
//         },
//       },
//       { $sort: { count: -1 } },
//     ]);
//     res.json({ success: true, grouped });
//   } catch (err) { next(err); }
// };

// // PUT /api/admin/applications/:id  (update status / mark read)
// const updateApplication = async (req, res, next) => {
//   try {
//     const app = await ApplyNow.findByIdAndUpdate(
//       req.params.id, req.body, { new: true }
//     ).populate('careerId', 'role location jobType');

//     if (!app) return res.status(404).json({ success: false, message: 'Application not found' });
//     res.json({ success: true, message: 'Application updated', application: app });
//   } catch (err) { next(err); }
// };

// // DELETE /api/admin/applications/:id
// const deleteApplication = async (req, res, next) => {
//   try {
//     const app = await ApplyNow.findById(req.params.id);
//     if (!app) return res.status(404).json({ success: false, message: 'Application not found' });
//     await deleteFromImageKit(app.resume.fileId).catch(() => {});
//     await app.deleteOne();
//     res.json({ success: true, message: 'Application deleted' });
//   } catch (err) { next(err); }
// };

// // GET /api/admin/applications/export  (Excel download)
// const exportApplications = async (req, res, next) => {
//   try {
//     const { careerId } = req.query;
//     const filter = {};
//     if (careerId) filter.careerId = careerId;

//     const applications = await ApplyNow.find(filter)
//       .populate('careerId', 'role location jobType')
//       .sort({ createdAt: -1 });

//     const data = applications.map((a, i) => ({
//       'S.No':         i + 1,
//       'Name':         a.name,
//       'Email':        a.email,
//       'Phone':        a.number,
//       'Applied For':  a.careerRole || a.careerId?.role || 'General',
//       'Location':     a.careerId?.location || '—',
//       'Job Type':     a.careerId?.jobType  || '—',
//       'Message':      a.message  || '—',
//       'Resume URL':   a.resume?.url,
//       'Status':       a.status,
//       'Applied On':   new Date(a.createdAt).toLocaleString('en-IN'),
//     }));

//     exportToExcel(res, data, 'Applications', 'applications');
//   } catch (err) { next(err); }
// };

// module.exports = {
//   submitApplication,
//   getAllApplications,
//   getApplicationsByCareer,
//   updateApplication,
//   deleteApplication,
//   exportApplications,
// };

// controllers/apply.controller.js

const ApplyNow = require("../models/ApplyNow");
const Career = require("../models/Career");

const {
  uploadToImageKit,
  deleteFromImageKit,
} = require("../config/imagekit");

const {
  exportToExcel,
} = require("../utils/exportExcel");


// ─────────────────────────────────────
// POST /api/apply
// Public
// ─────────────────────────────────────
const submitApplication = async (
  req,
  res,
  next
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume is required",
      });
    }

    const {
      name,
      email,
      number,
      message,
      careerId,
      applyingFor,
    } = req.body;

    if (!name || !email || !number) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email and number are required",
      });
    }

    // ─────────────────────────────────────
    // Upload Resume
    // ─────────────────────────────────────
    const resumeResult =
      await uploadToImageKit(
        req.file.buffer,
        req.file.originalname,
        "/resumes"
      );

    // ─────────────────────────────────────
    // Validate Career
    // ─────────────────────────────────────
    let validCareerId = null;
    let finalApplyingFor =
      applyingFor || "General Application";

    if (careerId) {
      const career =
        await Career.findById(careerId);

      if (career) {
        validCareerId = career._id;

        finalApplyingFor =
          career.role ||
          applyingFor ||
          "General Application";
      }
    }

    // ─────────────────────────────────────
    // Create Application
    // ─────────────────────────────────────
    const application =
      await ApplyNow.create({
        careerId: validCareerId,

        applyingFor: finalApplyingFor,

        name,
        email,
        number,
        message,

        resume: {
          url: resumeResult.url,
          fileId: resumeResult.fileId,
          name: req.file.originalname,
        },
      });

    return res.status(201).json({
      success: true,
      message:
        "Application submitted successfully",
      application,
    });
  } catch (err) {
    next(err);
  }
};


// ─────────────────────────────────────
// GET ALL APPLICATIONS
// Admin
// ─────────────────────────────────────
const getAllApplications = async (
  req,
  res,
  next
) => {
  try {
    const {
      status,
      careerId,
      page = 1,
      limit = 15,
    } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (careerId) {
      filter.careerId = careerId;
    }

    const applications =
      await ApplyNow.find(filter)
        .populate(
          "careerId",
          "role location jobType"
        )
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit));

    const total =
      await ApplyNow.countDocuments(filter);

    const unread =
      await ApplyNow.countDocuments({
        isRead: false,
      });

    res.json({
      success: true,
      total,
      unread,
      page: Number(page),
      applications,
    });
  } catch (err) {
    next(err);
  }
};


// ─────────────────────────────────────
// GROUP APPLICATIONS BY ROLE
// ─────────────────────────────────────
const getApplicationsByCareer =
  async (req, res, next) => {
    try {
      const grouped =
        await ApplyNow.aggregate([
          {
            $group: {
              _id: "$applyingFor",
              count: {
                $sum: 1,
              },
            },
          },

          {
            $sort: {
              count: -1,
            },
          },
        ]);

      res.json({
        success: true,
        grouped,
      });
    } catch (err) {
      next(err);
    }
  };


// ─────────────────────────────────────
// UPDATE APPLICATION
// ─────────────────────────────────────
const updateApplication = async (
  req,
  res,
  next
) => {
  try {
    const app =
      await ApplyNow.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      ).populate(
        "careerId",
        "role location jobType"
      );

    if (!app) {
      return res.status(404).json({
        success: false,
        message:
          "Application not found",
      });
    }

    res.json({
      success: true,
      message:
        "Application updated",
      application: app,
    });
  } catch (err) {
    next(err);
  }
};


// ─────────────────────────────────────
// DELETE APPLICATION
// ─────────────────────────────────────
const deleteApplication = async (
  req,
  res,
  next
) => {
  try {
    const app =
      await ApplyNow.findById(
        req.params.id
      );

    if (!app) {
      return res.status(404).json({
        success: false,
        message:
          "Application not found",
      });
    }

    await deleteFromImageKit(
      app.resume.fileId
    ).catch(() => {});

    await app.deleteOne();

    res.json({
      success: true,
      message:
        "Application deleted",
    });
  } catch (err) {
    next(err);
  }
};


// ─────────────────────────────────────
// EXPORT APPLICATIONS
// ─────────────────────────────────────
const exportApplications =
  async (req, res, next) => {
    try {
      const { careerId } = req.query;

      const filter = {};

      if (careerId) {
        filter.careerId = careerId;
      }

      const applications =
        await ApplyNow.find(filter)
          .populate(
            "careerId",
            "role location jobType"
          )
          .sort({ createdAt: -1 });

      const data = applications.map(
        (a, i) => ({
          "S.No": i + 1,

          Name: a.name,

          Email: a.email,

          Phone: a.number,

          "Applied For":
            a.applyingFor ||
            "General Application",

          Location:
            a.careerId?.location || "—",

          "Job Type":
            a.careerId?.jobType || "—",

          Message:
            a.message || "—",

          "Resume URL":
            a.resume?.url,

          Status: a.status,

          "Applied On":
            new Date(
              a.createdAt
            ).toLocaleString("en-IN"),
        })
      );

      exportToExcel(
        res,
        data,
        "Applications",
        "applications"
      );
    } catch (err) {
      next(err);
    }
  };

module.exports = {
  submitApplication,
  getAllApplications,
  getApplicationsByCareer,
  updateApplication,
  deleteApplication,
  exportApplications,
};