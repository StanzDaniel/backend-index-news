export const error = (err, req, res, next) => {
  console.warn(err.stack);
  res.status(err.code).send(err.message);
};