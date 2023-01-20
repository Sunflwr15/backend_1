const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (res, file, cb) {
    cb(null, path.join(__dirname, "upload"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const uploadsinglefile = multer({ storage: storage }).single("file");

module.exports = uploadsinglefile;
