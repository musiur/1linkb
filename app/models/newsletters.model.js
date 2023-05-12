const mongoose = require("mongoose");

const Newsletters = mongoose.model(
  "Newsletters",
  new mongoose.Schema({
    username: {type:String, required: true},
    pathname: {type:String, required: true},
    emails: [{type: String, required: true}]
  })
);

module.exports = Newsletters;
