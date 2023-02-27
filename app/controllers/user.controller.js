
const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
  User.find({},(err, users) => {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });

    res.status(200).send(userMap);  
  });
};


exports.userBoard = (req, res) => {
  User.findOne({_id: "63f52aa29f997a9ccc44a1e0"}, (err, users) => {
    res.status(200).send(users)
  })
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
