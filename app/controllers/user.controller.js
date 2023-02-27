
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
  try {
    User.find({roles: "63f5bf453e570110746d80af"}, (err, users) => {
      if(err){
        res.status(404).send(err)
      }
      res.status(200).send({userList: users})
    })
  } catch (error) {
    res.status(500).send("Something went wrong!")
  }
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
