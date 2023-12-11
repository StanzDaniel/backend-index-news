
export const returnUser =  async (req, res) => {
  const user = req.body.user;
  res.status(200).json(user);
}
