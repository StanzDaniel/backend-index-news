import 'dotenv/config';

export const SECRET = {
  JWT: process.env.JWT,
  ACCESS_KEY: process.env.ACCESS_KEY,
  BD_CREDENTIALS: process.env.BD_CREDENTIALS,
}
