const mongoose = require("mongoose");

const Links = mongoose.model(
  "Links",
  new mongoose.Schema({
    pathname: String,
    username: String, 
  })
);

module.exports = Links;
