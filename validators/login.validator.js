import { body } from "express-validator";
import { validateResults } from "../utilities/validateResults.utility.js";

export const loginValidation = [
  body('email')
    .exists()
    .trim()
    .notEmpty()
    .toLowerCase()
    .isEmail()
    .withMessage('Not a valid e-mail address')
    .escape(),
  body('password')
    .exists()
    .trim()
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage('Your password must contain at least 8 characters ')
    .escape(),
  (req, res, next) => validateResults(req, res, next),
];