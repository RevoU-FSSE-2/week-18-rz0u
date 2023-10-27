const { body, validationResult } = require("express-validator");

// Email Validation
const emailValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email cannot be blank")
    .isEmail()
    .withMessage("Please enter a valid email address"),
];

// Username Validation
const usernameValidator = [
  body("username").notEmpty().withMessage("Username cannot be blank"),
];

// Password Validation
const passwordAlphanumeric = (value) => {
  if (!/[a-zA-Z]/.test(value) || !/[0-9]/.test(value)) {
    throw new Error("Password must contain both alphabet and number");
  }
  return true;
};

const passwordValidator = [
  body("password")
    .notEmpty()
    .withMessage("Password cannot be blank")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long")
    .custom(passwordAlphanumeric)
    .withMessage("Password must be alphanumeric"),
];

// Role Validation
const roleValidator = [
  body("role")
    .notEmpty()
    .withMessage("Role cannot be blank")
    .isIn(["manager", "employee"])
    .withMessage("Role must be either 'manager' or 'employee'"),
];

// Validator
exports.validator = [
  ...emailValidator,
  ...usernameValidator,
  ...passwordValidator,
  ...roleValidator,
];

// Validation Middleware
exports.validateInput = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
