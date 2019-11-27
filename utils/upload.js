const multer = require('multer');
const maxSize = 1000000; // 1MB
const upload = multer({ limits: { fileSize: maxSize }, dest: 'public/images/uploaded/' });

module.exports = upload;