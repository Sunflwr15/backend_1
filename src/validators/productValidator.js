const { check } = require("express-validator");
const CreateProductValidator = [
  // check("nama")
  //   .isLength({
  //     min: 1,
  //   })
  //   .withMessage("You Must Fill The Field"),
  // check("harga")
  //   .isLength({
  //     min: 1,
  //   })
  //   .isNumeric()
  //   .withMessage("Number Format")
];

module.exports = { CreateProductValidator };
