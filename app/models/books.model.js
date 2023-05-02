const mongoose = require("mongoose");

const Books = mongoose.model(
  "Books",
  new mongoose.Schema({
    username: {type:String, required: true},
    pathname: {type:String, required: true},
    title: {type:String, required: true},
    subTitle: {type:String, required: true}, 
    shortDescription: {type:String, required: true},
    image: {type:String, required: true},
    details: {type:String, required: true},
    purchaseLink: {type: String, required: true}
  })
);

module.exports = Books;
