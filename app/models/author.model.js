const mongoose = require("mongoose");

const Editor = mongoose.model(
  "Author",
  new mongoose.Schema({
    username: String,
    bio: String,
    blogs: [Object]
  })
);

module.exports = Editor;
