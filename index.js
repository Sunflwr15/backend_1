require("dotenv").config();
const port = process.env.PORT || 1230;
const host = "localhost";
const express = require("express");
const moment = require("moment");
const dayjs = require("dayjs");
const router = require("./src/router");
const log = require("./src/middleware/log");
const notFound = require("./src/middleware/404");
const errorHandling = require("./src/middleware/errorHandling");
const auth = require("./src/middleware/auth");
const md1 = require("./src/middleware/mid1");
const multer = require("multer");
const uploadmultifile = require("./src/storage/multifileupload");
const uploadsinglefile = require("./src/storage/fileuploadsingle");
const { sequelize } = require("./src/models");


const app = express();

console.log(process.env.DB_USERNAME_DEV);

app.use(express.json());
// apse(auth)
// app.use(uploadmultifile)
// app.use(uploadsinglefile)
app.use(express.static("storage/upload"));
app.use(md1);
app.use(log);
app.use(router);
app.use(notFound);
app.use(errorHandling);

app.listen(port, host, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    console.log(`Server is Running at http://${host}:${port}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
