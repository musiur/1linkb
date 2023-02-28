const mongoose = require("mongoose");

const Links = mongoose.model(
  "Links",
  new mongoose.Schema({
    title: String,
    username: String, 
  })
);

module.exports = Links;
