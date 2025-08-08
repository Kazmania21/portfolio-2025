const multer = require('multer');
const mime = require('mime-types');

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images'); // Folder where files will be stored
  },
  filename: (req, file, cb) => {
    // Get file extension from MIME type
    const extension = mime.extension(file.mimetype) || '';
    cb(null, file.fieldname + '-' + Date.now() + (extension ? '.' + extension : ''));
  }
});

module.exports = storage;
