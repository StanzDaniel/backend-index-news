import path from 'path';
import multer from 'multer';
import fs from 'fs';
import { User } from '../database/models.database.js';

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "./uploads";

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

export const setImage = async (req, res) => {  
  try {
    const user = await User.findOne({email: req.body.user.email});
    console.log(req.file)
    user.image = req.file.filename;
    user.save();
    return res.sendStatus(200);
  } catch (error) {
    res.status(422).send(error.message);
  }
}
