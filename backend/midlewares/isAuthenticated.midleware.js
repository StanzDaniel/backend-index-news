import express from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../models/secret.model.js";
import { User } from "../database/models.database.js";

export const validateJwt = (req, res, next) => {
  const token = req.header('Authorization');

  jwt.verify(token, SECRET.JWT, (err, id ) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.body.auth = id;
  })

  next();
}


const assignUser = async (req, res, next) => {
  try {
      const id = req.body.auth;
      const user = await User.findById(id);
      if (!user) throw new Error('user not found');
      const userWithToken = { ...user._doc, token: req.header('Authorization') };
      req.body.user = userWithToken;
      next();
  } catch (error) {
    next(error);
  }
};


export const  isAuthenticated = express.Router().use(validateJwt, assignUser);