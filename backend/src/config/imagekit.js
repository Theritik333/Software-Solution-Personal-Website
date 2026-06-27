const ImageKit = require('imagekit');
const multer = require('multer');

// imagekit instance is created lazily so missing env vars
// don't crash the process at require-time (only at runtime)
let _imagekit = null;
const getImageKit = () => {
  if (!_imagekit) {
    _imagekit = new ImageKit({
      publicKey:   process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey:  process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });
  }
  return _imagekit;
};

// Upload file buffer to ImageKit
// folder: e.g. '/projects', '/partners', '/resumes'
const uploadToImageKit = (buffer, fileName, folder, mimeType) => {
  return new Promise((resolve, reject) => {
    getImageKit().upload(
      {
        file:              buffer.toString('base64'),
        fileName:          fileName,
        folder:            folder,
        useUniqueFileName: true,
        tags:              [folder.replace('/', '')],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          url:      result.url,
          fileId:   result.fileId,   // used to delete later
          name:     result.name,
        });
      }
    );
  });
};

// Delete file from ImageKit using fileId
const deleteFromImageKit = (fileId) => {
  return new Promise((resolve, reject) => {
    getImageKit().deleteFile(fileId, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

// Multer - memory storage (buffer passed to ImageKit)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images, PDF and DOC allowed.'), false);
    }
  },
});

module.exports = { upload, uploadToImageKit, deleteFromImageKit };
