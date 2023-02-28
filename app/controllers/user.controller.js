

const User = require("../models/user.model");

exports.all = async (req, res) => {
  await User.find({}, (err, result) => {
    if (err) {
      res.status(500).send({
        message: "Something went wrong!"
      })
    } else {
      res.status(200).send({
        message: "Links fetched successfully!",
        result
      })
    }
  })
};


exports.userBoard = (req, res) => {
  try {
    User.find({ roles: "63f5bf453e570110746d80af" }, (err, users) => {
      if (err) {
        res.status(404).send({
          message: "User not found!",
          error: err
        })
      }
      res.status(200).send({
        message: "User list fetched successfully!",
        userList: users
      })
    })
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong!"
    })
  }
};

exports.moderatorBoard = (req, res) => {
  try {
    User.find({ roles: "63f5bf453e570110746d80b0" }, (err, users) => {
      if (err) {
        res.status(404).send({
          message: "User not found!",
          error: err
        })
      }
      res.status(200).send({ message: "Moderator list fetched successfully!", userList: users })
    })
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong!"
    })
  }
};

exports.adminBoard = (req, res) => {
  try {
    User.find({ roles: "63f5bf453e570110746d80b1" }, (err, users) => {
      if (err) {
        res.status(404).send({
          message: "User not found!",
          error: err
        })
      }
      res.status(200).send({ message: "Admin list fetched successfully!", userList: users })
    })
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong!"
    })
  }
};

exports.update = async (req, res) => {
  try {
    await User.find({ username: req.body.username }, (err0, users) => {
      if (err0) {
        res.status(404).send({
          message: "User not found!",
          error: err0
        })
      }
      const UpdateData = async () => {
        await User.updateOne({ _id: req.params.id }, req.body, (err, result) => {
          if (err) {
            res.status(500).send({
              message: "Something went wrong!"
            })
          } else {
            res.status(200).send({
              message: "User data udpated successfully!",
              result
            })
          }
        })
      }
      if (!users.length) {
        UpdateData();
      } else {
        res.status(409).send({
          message: "Username already exist!"
        })
      }
    })
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong!"
    })
  }

}

exports.delete = async (req, res) => {
  try {
    await User.find({ username: req.params.username }, (err0, users) => {
      if (err0) {
        res.status(404).send({
          message: "User not found!",
          error: err0
        })
      } else {
        const DeleteData = async () => {
          await User.deleteOne({ _id: req.params.id }, (err, result) => {
            if (err) {
              res.status(500).send({
                message: "Something went wrong!"
              })
            } else {
              res.status(200).send({
                message: "User deleted successfully!",
                result
              })
            }
          })
        }
        if (users.length) {
          DeleteData();
        } else {
          res.status(409).send({
            message: "Username not found!"
          })
        }
      }

    })
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong!"
    })
  }

}
