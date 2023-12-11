import { body } from "express-validator";
import { validateResults } from "../utilities/validateResults.utility.js";

export const changePasswordValidation = [
  body('currentPassword')
  .exists()
  .notEmpty()
  .isLength({ min: 8 })
  .withMessage('Your password must contain at least 8 characters ')
  .trim()
  .escape(),
  body('newPassword')
  .exists()
  .notEmpty()
  .isLength({ min: 8 })
  .withMessage('Your password must contain at least 8 characters ')
  .trim()
  .escape(),
  body('passwordConfirmation').custom((value, { req }) => {
  return value === req.body.newPassword;
  }),
  (req, res, next) => validateResults(req, res, next),
]