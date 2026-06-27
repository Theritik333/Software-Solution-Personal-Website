const Career = require("../models/Career");


// ─────────────────────────────────────────────
// GET ALL CAREERS
// ─────────────────────────────────────────────
const getCareers = async (req, res, next) => {
  try {

    // Admin => all careers
    // Public => only active careers

    const filter = req.admin
      ? {}
      : { isActive: true };

    const careers = await Career
      .find(filter)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: careers.length,
      careers,
    });

  } catch (err) {
    next(err);
  }
};


// ─────────────────────────────────────────────
// CREATE CAREER
// ─────────────────────────────────────────────
const createCareer = async (req, res, next) => {
  try {

    const {
      role,
      location,
      jobDescription,
      requirements,
      mustHaveSkills,
      jobType,
      experienceLevel,
      salary,
      isActive,
      lastDate,
    } = req.body;

    // ─── VALIDATION ──────────────────────────

    if (!role || !location || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Role, location and job description are required",
      });
    }

    // ─── DUPLICATE CHECK ─────────────────────

    const existingCareer = await Career.findOne({
      role,
      location,
      isActive: true,
    });

    if (existingCareer) {
      return res.status(409).json({
        success: false,
        message: "This job already exists",
      });
    }

    // ─── CREATE CAREER ───────────────────────

    const career = await Career.create({
      role,
      location,
      jobDescription,

      requirements: Array.isArray(requirements)
        ? requirements
        : [],

      mustHaveSkills: Array.isArray(mustHaveSkills)
        ? mustHaveSkills
        : [],

      jobType,
      experienceLevel,
      salary,
      isActive,
      lastDate,
    });

    res.status(201).json({
      success: true,
      message: "Career posted successfully",
      career,
    });

  } catch (err) {
    next(err);
  }
};


// ─────────────────────────────────────────────
// UPDATE CAREER
// ─────────────────────────────────────────────
const updateCareer = async (req, res, next) => {
  try {

    const {
      role,
      location,
      jobDescription,
      requirements,
      mustHaveSkills,
      jobType,
      experienceLevel,
      salary,
      isActive,
      lastDate,
    } = req.body;

    const career = await Career.findById(
      req.params.id
    );

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Career not found",
      });
    }

    // ─── UPDATE FIELDS ───────────────────────

    career.role =
      role || career.role;

    career.location =
      location || career.location;

    career.jobDescription =
      jobDescription || career.jobDescription;

    career.requirements =
      Array.isArray(requirements)
        ? requirements
        : career.requirements;

    career.mustHaveSkills =
      Array.isArray(mustHaveSkills)
        ? mustHaveSkills
        : career.mustHaveSkills;

    career.jobType =
      jobType || career.jobType;

    career.experienceLevel =
      experienceLevel || career.experienceLevel;

    career.salary =
      salary || career.salary;

    if (typeof isActive === "boolean") {
      career.isActive = isActive;
    }

    career.lastDate =
      lastDate || career.lastDate;

    await career.save();

    res.status(200).json({
      success: true,
      message: "Career updated successfully",
      career,
    });

  } catch (err) {
    next(err);
  }
};


// ─────────────────────────────────────────────
// DELETE CAREER
// ─────────────────────────────────────────────
const deleteCareer = async (req, res, next) => {
  try {

    const career = await Career.findById(
      req.params.id
    );

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Career not found",
      });
    }

    await career.deleteOne();

    res.status(200).json({
      success: true,
      message: "Career deleted successfully",
    });

  } catch (err) {
    next(err);
  }
};


module.exports = {
  getCareers,
  createCareer,
  updateCareer,
  deleteCareer,
};