const express = require("express");
const router = express.Router();
const {
  register,
  login,
} = require("../controllers/authController");
const { jwtValidateMid } = require("../middleware/jwtValidateMid");


//Auth
router.post("/login", login);
router.post("/register", register);

router.use(jwtValidateMid);

module.exports = router;
