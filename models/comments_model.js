const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "post", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const commentModel = new mongoose.model("comment", commentSchema);

module.exports = commentModel;
