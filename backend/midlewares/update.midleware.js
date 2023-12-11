import { User } from "../database/models.database.js";
import { encrypt } from "../utilities/crypt.utility.js";

export const updateUser = async (req, res) => {
  const newData = req.body;
  const oldData = req.body.user;
  const { email } = req.body.user;

  try {

    const updatedUser = {
      name: newData.name || oldData.name,
      lastName: newData.lastName || oldData.lastName,
      userName: newData.userName || oldData.userName,
      email: oldData.email,
      password: oldData.password,
      salt: oldData.salt,
      image: oldData.image,
      history: oldData.history,
      readLater: oldData.readLater,
    }    

    if (newData.password) {
      const {salt, hash } = await encrypt(newData.password);

      const userWithNewPassword = {
        ...updatedUser,
        password: hash,
        salt: salt,
      }

      await User.findOneAndUpdate({email: email}, userWithNewPassword);
      return res.sendStatus(200);
    }
  
    await User.findOneAndUpdate({email: email}, updatedUser);
    res.sendStatus(200);
    
  } catch (error) {
      res.status(400).send(`400 Bad Request - ${error.message}`);
  }
}