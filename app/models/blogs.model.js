const mongoose = require("mongoose");

const Blogs = mongoose.model(
  "Blogs",
  new mongoose.Schema({
    username: {type:String, required: true},
    pathname: {type:String, required: true},
    title: {type:String, required: true},
    subTitle: {type:String, required: true}, 
    shortDescription: {type:String, required: true},
    image: {type:String, required: true},
    details: {type:{}, required: true}
  })
);

module.exports = Blogs;
