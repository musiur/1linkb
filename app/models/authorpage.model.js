const mongoose = require("mongoose");

const Authorpage = mongoose.model(
  "Authorpage",
  new mongoose.Schema({
    username: {type: String, required: true},
    pathname: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    authorTitle: {type: String, required: true},
    authorDescription: {type: String, required: true},
    image: {type: String, required: true}
  })
);

module.exports = Authorpage;
