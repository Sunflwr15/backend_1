require("dotenv").config();
const port = process.env.PORT || 1000;
const host = "localhost";
const express = require("express");
const moment = require("moment");
const dayjs = require("dayjs");
const routes = require("./src/routes/routes");
const { sequelize } = require("./src/models");

const app = express();

app.use(express.json());
app.use(routes);
app.listen(port, host, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    console.log(`Server is Running at http://${host}:${port}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
