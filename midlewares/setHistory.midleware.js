import { User } from "../database/models.database.js";

export const setHistory = async (req, res) => {
  const { body } = req;

  try {
    const user = await User.findOne({email: body.user.email});
    user.history.unshift(body.news);
    user.save();
    return res.sendStatus(200);
  } catch (error) {
    res.status(422).send(error.mesage);
  }
}