import { body } from "express-validator";
import { validateResults } from "../utilities/validateResults.utility.js";

export const registerValidation = [
  body('name').exists().trim().notEmpty().isString().escape(),
  body('lastName').exists().trim().notEmpty().isString().escape(),
  body('userName').exists().trim().notEmpty().isString().escape(),
  body('email')
    .exists()
    .notEmpty()
    .toLowerCase()
    .isEmail()
    .withMessage('Not a valid e-mail address')
    .trim()
    .escape(),
  body('password')
    .exists()
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage('Your password must contain at least 8 characters ')
    .trim()
    .escape(),
  (req, res, next) => validateResults(req, res, next),
];