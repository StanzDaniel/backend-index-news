import { User } from "../database/models.database.js";
import { decrypt } from "../utilities/crypt.utility.js";
import { signToken } from "../utilities/auth.utility.js";

export const loginUser =  async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.findOne({email: email});

    if (!user) {
      return res.status(400).send("user not found, please confirm your email address or register")
    }


    const isMatch = await decrypt(password, user.password);
    if (!isMatch) {
      return res.status(401).send("user or password incorrect");
    }
    const signed = signToken(user._id.valueOf());
    const loggedUser = {...user._doc, token: signed};
    return res.status(200).send(loggedUser);
  } catch (error) {
    res.status(422).send(error.mesage);
  }
}