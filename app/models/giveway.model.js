const mongoose = require("mongoose");

const Giveway = mongoose.model(
  "Giveway",
  new mongoose.Schema({
    username: {type:String, required: true},
    pathname: {type:String, required: true},
    file: {type: String, required: true},
    extension: {type: String, required: true},
  })
);

module.exports = Giveway;
