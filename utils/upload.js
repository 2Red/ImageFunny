const multer = require('multer');
const upload = multer({ dest: './public/images/uploaded/' });

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

module.exports = upload;