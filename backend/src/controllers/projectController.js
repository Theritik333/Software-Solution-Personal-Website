const Project = require('../models/Project');
const { uploadToImageKit, deleteFromImageKit } = require('../config/imagekit');

// @GET /api/projects  (public)
const getAllProjects = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (category) filter.category = category;

    // Public: only visible projects
    if (!req.admin) filter.isVisible = true;

    const projects = await Project.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Project.countDocuments(filter);
    res.json({ success: true, total, page: Number(page), projects });
  } catch (err) { next(err); }
};

// @GET /api/projects/:id  (public)
const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, project });
  } catch (err) { next(err); }
};

// @POST /api/admin/projects  (protected)
const createProject = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'Image is required' });

    const imageResult = await uploadToImageKit(
      req.file.buffer, req.file.originalname, '/projects', req.file.mimetype
    );

    const { category, title, description, keyFeatures, technologies, liveUrl, githubUrl, order } = req.body;

    const project = await Project.create({
      image:        { url: imageResult.url, fileId: imageResult.fileId },
      category,
      title,
      description,
      keyFeatures:  keyFeatures  ? JSON.parse(keyFeatures)  : [],
      technologies: technologies ? JSON.parse(technologies) : [],
      liveUrl,
      githubUrl,
      order: order || 0,
    });

    res.status(201).json({ success: true, message: 'Project created', project });
  } catch (err) { next(err); }
};

// @PUT /api/admin/projects/:id  (protected)
const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

    // Replace image if new one uploaded
    if (req.file) {
      await deleteFromImageKit(project.image.fileId).catch(() => {});
      const imageResult = await uploadToImageKit(
        req.file.buffer, req.file.originalname, '/projects', req.file.mimetype
      );
      project.image = { url: imageResult.url, fileId: imageResult.fileId };
    }

    const fields = ['category', 'title', 'description', 'liveUrl', 'githubUrl', 'isVisible', 'order'];
    fields.forEach(f => { if (req.body[f] !== undefined) project[f] = req.body[f]; });

    if (req.body.keyFeatures)  project.keyFeatures  = JSON.parse(req.body.keyFeatures);
    if (req.body.technologies) project.technologies = JSON.parse(req.body.technologies);

    await project.save();
    res.json({ success: true, message: 'Project updated', project });
  } catch (err) { next(err); }
};

// @DELETE /api/admin/projects/:id  (protected)
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

    await deleteFromImageKit(project.image.fileId).catch(() => {});
    await project.deleteOne();

    res.json({ success: true, message: 'Project deleted' });
  } catch (err) { next(err); }
};

module.exports = { getAllProjects, getProject, createProject, updateProject, deleteProject };
