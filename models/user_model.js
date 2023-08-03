const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  introduceYourself: { type: String },
  birthday: { type: String },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "like" }],
  createdAt: { type: Date, default: Date.now },
});

const userModel = new mongoose.model("user", userSchema);

module.exports = userModel;
