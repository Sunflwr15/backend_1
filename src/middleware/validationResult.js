const { validationResult } = require("express-validator");

async function ValidationResult(req, res, next) {
  const errors = validationResult(req);
//   console.log(errors.errors[0]);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }
  next()
}

module.exports = ValidationResult;