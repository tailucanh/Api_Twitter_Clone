require("dotenv").config();

const express = require("express");
var mongoose = require("mongoose");
const PORT = process.env.PORT || 8000;
const usersRouter = require("./routes/routers_users");
const postsRouter = require("./routes/routers_posts");
const commentsRouter = require("./routes/routers_comments");
const likesRouter = require("./routes/routers_likes");

var app = express();
mongoose.set("strictQuery", false);
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/likes", likesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
