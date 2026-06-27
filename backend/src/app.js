require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const partnerRoutes = require('./routes/partners');
const serviceRoutes = require('./routes/services');
const technologyRoutes = require('./routes/technologies');
const reviewRoutes = require('./routes/reviews');
const aboutRoutes = require('./routes/about');
const contactRoutes = require('./routes/contact');
const applyRoutes = require('./routes/apply');
const careerRoutes = require('./routes/careers');
const privacyRoutes = require('./routes/privacyPolicy');
const settingsRoutes = require('./routes/settings');
const dashboardRoutes = require('./routes/dashboard');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// ─── CONNECT DB ────────────────────────────────────────────────────────────
connectDB();

// ─── SECURITY MIDDLEWARE ─────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});
app.use('/api/', limiter);

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many login attempts. Try after 15 minutes.' },
});
app.use('/api/auth/login', loginLimiter);

// ─── BODY PARSERS ───────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// ─── ROUTES ─────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/technologies', technologyRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api', aboutRoutes);
app.use('/api', contactRoutes);
app.use('/api', applyRoutes);
app.use('/api', privacyRoutes);
app.use('/api', settingsRoutes);
app.use('/api', dashboardRoutes);
app.get('/', (req, res) => res.json({ success: true, message: 'Software Solutions API running ✅' }));

// ─── ERROR HANDLER ──────────────────────────────────────────────────────────
app.use(errorHandler);

module.exports = app;
