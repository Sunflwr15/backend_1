const express = require("express");
const auth = require("./middleware/auth");
const uploadsinglefile = require("./storage/fileuploadsingle");
const uploadmultifile = require("./storage/multifileupload");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({
    status: 200,
    message: "Success",
  });
});

// router.use(auth);

router.get("/user/:nama", (req, res) => {
  const nama = req.params.nama;
  const data = {
    nama: nama,
  };
  res.send({
    status: 200,
    response: {
      message: "Success",
      data: data,
    },
  });
});

router.post("/user", (req, res) => {
  const payload = req.body;

  res.json({
    status: "Success",
    message: "Success create user",
    data: {
      nama: payload.nama,
      kelas: payload.kelas,
    },
  });
  console.log(payload);
});

router.post("/upload/single", uploadsinglefile, (req, res) => {
  res.send({
    status: "succes",
    msg: "File Uploaded",
    file: req.file,
    fileURL: `${req.protocol}://${req.get("host")}/${req.file.filename}`,
  });
  console.log(req.file);
});
router.post("/upload/multi", uploadmultifile, (req, res) => {
  res.send({
    status: "succes",
    msg: "File Uploaded",
    file: req.files,
    // fileURL: `${req.protocol}://${req.get("host")}/${req.file.filename}`,
    url: req.files.map((i, index) => {
      return `${req.protocol}://${req.get("host")}/${
        req.files[index].filename
      }`;
    }),
  });
  console.log(req.files[1]);
});
module.exports = router;
