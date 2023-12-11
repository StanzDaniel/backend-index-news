import { User } from "../database/models.database.js";
import { encrypt } from "../utilities/crypt.utility.js";

export const registerUser = async (req, res) => {
  const { body } = req;
  try {
    const user = await User.findOne({email: body.email});
    const {salt, hash } = await encrypt(body.password);

    if (user) {
      return res.status(400).send("email already in use"); 
    }

    await User.create({
      name: body.name,
      lastName: body.lastName,
      userName: body.userName,
      email: body.email,
      password: hash,
      salt: salt,
    });
    
    return res.sendStatus(201);
  } catch (error) {
    res.status(422).send(error.mesage);
  }
};