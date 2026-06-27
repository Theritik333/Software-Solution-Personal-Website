const jwt        = require('jsonwebtoken');
const Admin      = require('../models/Admin');
const { uploadToImageKit, deleteFromImageKit } = require('../config/imagekit');

// Generate JWT and set cookie
const sendTokenCookie = (res, admin) => {
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

  res.cookie('adminToken', token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge:   7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};

// @POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email and password required' });

    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin || !(await admin.matchPassword(password)))
      return res.status(401).json({ success: false, message: 'Invalid credentials' });

    admin.lastLogin = new Date();
    await admin.save({ validateBeforeSave: false });

    sendTokenCookie(res, admin);

    res.json({
      success: true,
      message: 'Login successful',
      admin: {
        id:           admin._id,
        name:         admin.name,
        email:        admin.email,
        profileImage: admin.profileImage,
        role:         admin.role,
      },
    });
  } catch (err) { next(err); }
};

// @POST /api/auth/logout
const logout = (req, res) => {
  res.cookie('adminToken', '', { httpOnly: true, expires: new Date(0) });
  res.json({ success: true, message: 'Logged out successfully' });
};

// @GET /api/auth/me
const getMe = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    res.json({ success: true, admin });
  } catch (err) { next(err); }
};

// @PUT /api/auth/profile  (update name, email, password, profile image)
const updateProfile = async (req, res, next) => {
  try {
    const admin  = await Admin.findById(req.admin._id).select('+password');
    const { name, email, currentPassword, newPassword } = req.body;

    if (name)  admin.name  = name;
    if (email) admin.email = email;

    // Password change
    if (newPassword) {
      if (!currentPassword)
        return res.status(400).json({ success: false, message: 'Current password required' });
      const isMatch = await admin.matchPassword(currentPassword);
      if (!isMatch)
        return res.status(401).json({ success: false, message: 'Current password incorrect' });
      admin.password = newPassword;
    }

    // Profile image
    if (req.file) {
      // Delete old image if exists
      if (admin.profileImage.fileId) {
        await deleteFromImageKit(admin.profileImage.fileId).catch(() => {});
      }
      const result = await uploadToImageKit(
        req.file.buffer, req.file.originalname, '/admin-profiles', req.file.mimetype
      );
      admin.profileImage = { url: result.url, fileId: result.fileId };
    }

    await admin.save();
    res.json({ success: true, message: 'Profile updated', admin });
  } catch (err) { next(err); }
};

// @POST /api/auth/seed  — run once to create first admin (disable after use)
const seedAdmin = async (req, res, next) => {
  try {
    const exists = await Admin.findOne({});
    if (exists) return res.status(400).json({ success: false, message: 'Admin already exists' });

    const admin = await Admin.create({
      name:     'SSID Admin',
      email:    process.env.ADMIN_EMAIL  ,
      password: process.env.ADMIN_PASSWORD 
    });

    res.status(201).json({ success: true, message: 'Admin created', email: admin.email });
  } catch (err) { next(err); }
};

module.exports = { login, logout, getMe, updateProfile, seedAdmin };
