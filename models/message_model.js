const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  threadId: {
    type: String,
    required: true,
    unique: true,
  },
  messages: [
    {
      senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

// Tạo model từ Schema
const messageModel = mongoose.model("message", messageSchema);

module.exports = messageModel;
