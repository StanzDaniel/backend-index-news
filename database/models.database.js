import { Schema, model } from "mongoose";

const newsSchema = new Schema({
  title: String,
  author: String,
  published_date: String,
  published_date_precision: String,
  link: String,
  clean_url: String,
  excerpt: String,
  summary: String,
  rights: String,
  rank: Number,
  topic: String,
  country: String,
  language: String,
  authors: String,
  media: String,
  _id: String,
});

export const User = model("User", {
  name: String,
  lastName: String,
  userName: String,
  email: String,
  password: String,
  salt: String,
  image: String,
  history: [newsSchema],
  readLater: [newsSchema],
})