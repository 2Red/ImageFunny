const multer = require('multer');
const maxSize = 2000000; // 2MB
const upload = multer({ limits: { fileSize: maxSize }, dest: 'public/images/uploaded/' });

module.exports = upload;