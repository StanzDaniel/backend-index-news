import { body } from "express-validator";
import { validateResults } from "../utilities/validateResults.utility.js";

export const updateValidation = [
  body('name').optional().isString().escape(),
  body('lastName').optional().isString().escape(),
  body('userName').optional().isString().escape(),
  body('password').optional().isString().escape(),
  body('image').optional(),
  (req, res, next) => validateResults(req, res, next),
];