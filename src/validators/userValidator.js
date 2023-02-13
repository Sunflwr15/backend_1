const { check } = require("express-validator");
const userModel = require("../models").users;
const CreateUserValidator = [
  check("name")
    .isLength({
      min: 1,
    })
    .withMessage("You Must Fill The Field"),
  check("email")
    .isEmail()
    .withMessage("Email doesn't valid")
    .custom((value) => {
      return userModel
        .findOne({
          where: {
            email: value,
          },
        })
        .then((user) => {
          if (user) {
            return Promise.reject("E-mail already in use");
          }
        });
    }),
];
const UpdateUserValidator = [
  check("name")
    .isLength({
      min: 1,
    })
    .withMessage("You Must Fill The Field"),
  check("tempatLahir")
    .isLength({
      min: 1,
    })
    .withMessage("You Must Fill The Field"),
  check("date")
    .isLength({
      min: 1,
    })
    .withMessage("You Must Fill The Field"),
];
const UpdatePasswordUserValidator = [
  check("newpassword")
    .isLength({
      min: 8,
    })
    .withMessage("Password must be 8 Character"),
];

module.exports = {
  CreateUserValidator,
  UpdateUserValidator,
  UpdatePasswordUserValidator,
};
