const express = require("express");
const { getProduk, postProduk } = require("../controllers/productController");
const {
  getUser,
  createUser,
  deleteUser,
  getUserById,
  getUserByParams,
  updateUser,
  updatePasswordUser,
} = require("../controllers/userController");
const router = express.Router();
const ValidationResult = require("../middleware/validationResult");
const userValidator = require("../validators/userValidator");
const productValidator = require("../validators/productValidator");
const {
  register,
  login,
  lupaPassword,
  resetPasswordByMail,
} = require("../controllers/authController");
const { jwtValidateMid } = require("../middleware/jwtValidateMid");
const {
  createArtikel,
  getArtikel,
  deleteArtikel,
  updateArtikel,
  createInBulk,
  createMulti,
  deleteMulti,
} = require("../controllers/artikelController");

//Auth
router.post("/login", login);
router.post("/register", register);
router.post("/lupa-password", lupaPassword);
router.post("/reset-password/:id/:token", resetPasswordByMail);

router.use(jwtValidateMid);

// Artikel
router.get("/artikel/list", getArtikel);
router.post("/artikel/create", createArtikel);
router.post("/artikel/createBulk", createInBulk);
router.post("/artikel/createMulti", createMulti);
router.delete("/artikel/delete/:id", deleteArtikel);
router.delete("/artikel/deletemulti", deleteMulti);
router.put("/artikel/update/:id", updateArtikel);

// User
router.get("/user/list", getUser);
router.get("/user/detail/:id", getUserById);
router.get("/user/list/:email", getUserByParams);
router.post(
  "/user",
  userValidator.CreateUserValidator,
  ValidationResult,
  createUser
);
ValidationResult,
  router.put(
    "/user/update/:id",
    userValidator.UpdateUserValidator,
    ValidationResult,
    updateUser
  );
router.put(
  "/user/ganti-password/",
  userValidator.UpdatePasswordUserValidator,
  ValidationResult,
  updatePasswordUser
);
router.delete("/user/delete/:id", deleteUser);

// Product
router.get("/product/list", getProduk);
router.post(
  "/product",
  productValidator.CreateProductValidator,
  ValidationResult,
  postProduk
);

module.exports = router;
