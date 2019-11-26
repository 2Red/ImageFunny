var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var upload = require('../utils/upload.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("It's work");
});

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("json")
    .json({message: err});
};

router.post(
  "/upload",
  upload.single("file" /* name attribute of <file> element in your form */),
  (req, res) => {

    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "../public/images/uploaded/image.png");

    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
          .status(200)
          .contentType("text/plain")
          .end("File uploaded!");
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }
  }
);

module.exports = router;
