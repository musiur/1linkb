const mongoose = require("mongoose");

const Editor = mongoose.model(
  "Editor",
  new mongoose.Schema({
    username: String,
    editorData: Object
  })
);

module.exports = Editor;
