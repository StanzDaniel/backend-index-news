import { User } from "../database/models.database.js";
import { encrypt } from "../utilities/crypt.utility.js";

export const changePassword =  async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { email } = req.user;


  try {
    const user = await User.findOne({email: email});
    const {salt, hash } = await encrypt(newPassword);

    if (!isMatch) {
      return res.status(401).send("Current Password incorrect");
    }
    await User.findOneAndUpdate({email: email}, {password: hash, salt: salt})
    return res.status(200).send("Password updated");
  } catch (error) {
    res.status(400).send(`400 Bad Request - ${error.mesage}`);
  }
}