import { User } from "../database/models.database.js";

export const deleteUser = async (req, res) => {
  const { _id } = req.user;
  try {
    await User.findByIdAndDelete(_id.valueOf());

    return res.sendStatus(200);
  } catch (error) {
    res.status(400).send(`400 Bad Request - ${error.message}`);
  }
};

