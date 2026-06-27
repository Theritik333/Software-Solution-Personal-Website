# Software Solutions — Backend API

Complete MERN backend with ImageKit, JWT auth, and Excel export.

## 📁 Project Structure
```
backend/
├── config/
│   ├── db.js           → MongoDB connection
│   └── imagekit.js     → ImageKit upload/delete helpers
├── controllers/
│   ├── authController.js       → login, logout, profile
│   ├── projectController.js    → CRUD for projects
│   ├── contactController.js    → contact form + Excel export
│   ├── applyController.js      → apply now + resume upload + Excel export
│   ├── generalController.js    → partners, services, technologies,
│   │                             reviews, about, careers, privacy, settings
│   └── dashboardController.js  → stats + chart data
├── middleware/
│   ├── auth.js         → JWT protect middleware
│   └── errorHandler.js → global error handler
├── models/
│   ├── Admin.js
│   ├── Project.js
│   ├── Partner.js
│   ├── Service.js
│   ├── ClientReview.js
│   ├── About.js
│   ├── Contact.js
│   ├── ApplyNow.js
│   ├── Career.js
│   ├── Technology.js
│   ├── PrivacyPolicy.js
│   └── Setting.js
├── routes/
│   └── index.js        → all routes
├── utils/
│   └── exportExcel.js  → Excel export helper
├── server.js
├── package.json
└── .env.example
```

## 🚀 Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Create .env file
```bash
cp .env.example .env
```
Fill in your values in `.env`:
- `MONGO_URI` → MongoDB Atlas connection string
- `JWT_SECRET` → random 32+ character string
- `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PRIVATE_KEY`, `IMAGEKIT_URL_ENDPOINT` → from ImageKit dashboard

### 3. Create first admin (run once only!)
Start server then call:
```
POST http://localhost:5000/api/auth/seed
```
This creates admin from `.env` ADMIN_EMAIL and ADMIN_PASSWORD.
**Delete or disable this route after use.**

### 4. Run development server
```bash
npm run dev
```

---

## 🔐 Authentication
- JWT stored in **HTTP-only cookie** (secure, not accessible by JS)
- All `/api/admin/*` routes are protected
- Login rate limited to 10 attempts per 15 min

---

## 📋 All API Endpoints

### Auth
| Method | Route | Access |
|--------|-------|--------|
| POST | /api/auth/seed | One-time |
| POST | /api/auth/login | Public |
| POST | /api/auth/logout | Admin |
| GET  | /api/auth/me | Admin |
| PUT  | /api/auth/profile | Admin |

### Projects
| Method | Route | Access |
|--------|-------|--------|
| GET    | /api/projects | Public |
| GET    | /api/projects/:id | Public |
| POST   | /api/admin/projects | Admin |
| PUT    | /api/admin/projects/:id | Admin |
| DELETE | /api/admin/projects/:id | Admin |

### Partners
| Method | Route | Access |
|--------|-------|--------|
| GET    | /api/partners | Public |
| POST   | /api/admin/partners | Admin |
| PUT    | /api/admin/partners/:id | Admin |
| DELETE | /api/admin/partners/:id | Admin |

### Services
| Method | Route | Access |
|--------|-------|--------|
| GET    | /api/services | Public |
| POST   | /api/admin/services | Admin |
| PUT    | /api/admin/services/:id | Admin |
| DELETE | /api/admin/services/:id | Admin |

### Technologies
| Method | Route | Access |
|--------|-------|--------|
| GET    | /api/technologies | Public |
| POST   | /api/admin/technologies | Admin |
| PUT    | /api/admin/technologies/:id | Admin |
| DELETE | /api/admin/technologies/:id | Admin |

### Client Reviews
| Method | Route | Access |
|--------|-------|--------|
| GET    | /api/reviews | Public |
| POST   | /api/admin/reviews | Admin |
| PUT    | /api/admin/reviews/:id | Admin |
| DELETE | /api/admin/reviews/:id | Admin |

### About
| Method | Route | Access |
|--------|-------|--------|
| GET    | /api/about | Public |
| PUT    | /api/admin/about | Admin |

### Contact
| Method | Route | Access |
|--------|-------|--------|
| POST   | /api/contact | Public |
| GET    | /api/admin/contacts | Admin |
| GET    | /api/admin/contacts/export | Admin (downloads Excel) |
| PUT    | /api/admin/contacts/:id/read | Admin |
| DELETE | /api/admin/contacts/:id | Admin |

### Apply Now
| Method | Route | Access |
|--------|-------|--------|
| POST   | /api/apply | Public (resume upload) |
| GET    | /api/admin/applications | Admin |
| GET    | /api/admin/applications/export | Admin (downloads Excel) |
| PUT    | /api/admin/applications/:id | Admin |
| DELETE | /api/admin/applications/:id | Admin |

### Careers
| Method | Route | Access |
|--------|-------|--------|
| GET    | /api/careers | Public |
| POST   | /api/admin/careers | Admin |
| PUT    | /api/admin/careers/:id | Admin |
| DELETE | /api/admin/careers/:id | Admin |

### Privacy Policy
| Method | Route | Access |
|--------|-------|--------|
| GET    | /api/privacy-policy | Public |
| PUT    | /api/admin/privacy-policy | Admin |

### Settings
| Method | Route | Access |
|--------|-------|--------|
| GET    | /api/settings | Public |
| PUT    | /api/admin/settings | Admin |

### Dashboard
| Method | Route | Access |
|--------|-------|--------|
| GET    | /api/admin/dashboard | Admin (stats + charts) |

---

## 📤 File Upload Notes (ImageKit)
- All images/files go to ImageKit
- Each document stores `{ url, fileId }` — url for display, fileId for deletion
- When you update/delete, old file is auto-deleted from ImageKit
- Resumes (PDF/DOC) also stored in ImageKit under `/resumes` folder
- Max file size: **10MB**

## 📊 Excel Export
- Contact queries: `GET /api/admin/contacts/export`
- Apply Now queries: `GET /api/admin/applications/export`
- Both download as `.xlsx` file directly
