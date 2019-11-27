const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const upload = require('../utils/upload.js');
const ext_allowed = {
  png: '.png',
  jpg: '.jpg',
  gif: '.gif'
};
const ImageObj = require('../models/image.js');

const handleError = (err, res) => {
  res
    .status(500)
    .json({ message: "Oops! Something went wrong!" });
};

const saveImageInfoToDB = (res, path, category, search_key) => {
  let imageObj = new ImageObj({
    path, category, search_key
  });

  imageObj.save().then(() => {
    res
      .status(200)
      .json({ message: "File uploaded!" });
  }).catch(err => {
    res
      .status(500)
      .json({ message: "Cannot save image info to db!" });
  });
};

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("It's work");
});

/* POST upload image from client. */
router.post(
  "/upload",
  upload.single("file" /* name attribute of <file> element in your form */),
  (req, res) => {
    const tempPath = req.file.path;
    const category = req.body.category || '';
    const search_key = req.body.search_key || ''; // TODO array
    const ext = path.extname(req.file.originalname).toLowerCase();

    switch (ext) {
      case ext_allowed.png:
        { // use { to create another scope, if don't use targetPath will conflict
          let targetPath = tempPath + ext_allowed.png;
          fs.rename(tempPath, targetPath, err => {
            if (err) return handleError(err, res);

            saveImageInfoToDB(res, targetPath, category, search_key);
          });
        }
        break;
      case ext_allowed.jpg:
        {
          let targetPath = tempPath + ext_allowed.jpg;
          fs.rename(tempPath, targetPath, err => {
            if (err) return handleError(err, res);

            saveImageInfoToDB(res, targetPath, category, search_key);
          });
        }
        break;
      case ext_allowed.gif:
        {
          let targetPath = tempPath + ext_allowed.gif;
          fs.rename(tempPath, targetPath, err => {
            if (err) return handleError(err, res);

            saveImageInfoToDB(res, targetPath, category, search_key);
          });
        }
        break;
      default:
        fs.unlink(tempPath, err => {
          if (err) return handleError(err, res);

          res
            .status(403)
            .json({ message: "Only .png, .jpg and .gif files are allowed!" });
        });
    }
  }
);

router.get('/search', function (req, res, next) {
  let search_key = req.query.search_key;

  ImageObj.find({ search_key: search_key }, (err, data) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Oops! Something went wrong!" });
    } else {
      res
        .status(200)
        .json({ data });
    }
  });
});

module.exports = router;
