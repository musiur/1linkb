const mongoose = require("mongoose");

const Editor = mongoose.model(
  "Author",
  new mongoose.Schema({
    username: String,
    bio: String,
    blogs: Array
  })
);

module.exports = Editor;
