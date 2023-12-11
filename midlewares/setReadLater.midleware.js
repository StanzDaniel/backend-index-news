import { User } from "../database/models.database.js";

export const setReadLater = async (req, res) => {
  const { body } = req;

  try {
    const user = await User.findOne({email: body.user.email});

    const readLaterRemoved = user.readLater.filter((item) => item.content !== body.news.content);

    if (readLaterRemoved.length === user.readLater.length) {
      user.readLater.unshift(body.news);
    } else {
      user.readLater = readLaterRemoved;
    }
    user.save();
    return res.sendStatus(200);
  } catch (error) {
    res.status(422).send(error.message);
  }
}