import jwt from "jsonwebtoken";
import { SECRET } from "../models/secret.model.js";

export const auth = (req, res, next) => {
  const accessKey = req.header("Access-Key");
  if (accessKey !== SECRET.ACCESS_KEY) {
    return res.sendStatus(403);
  }
  next();
};

export const signToken = (value) => {
  const signed = jwt.sign(value, SECRET.JWT);
  return signed;
}