const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const config = require("../config/auth.config");

exports.all = async (req, res) => {
  await User.find({}, (err, result) => {
    if (err) {
      res.status(500).send({
        message: "Something went wrong!",
      });
    } else {
      res.status(200).send({
        message: "Links fetched successfully!",
        result,
      });
    }
  });
};

exports.userBoard = (req, res) => {
  try {
    User.find({ roles: "63f5bf453e570110746d80af" }, (err, users) => {
      if (err) {
        res.status(404).send({
          message: "User not found!",
          error: err,
        });
      }
      res.status(200).send({
        message: "User list fetched successfully!",
        userList: users,
      });
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong!",
    });
  }
};

exports.moderatorBoard = (req, res) => {
  try {
    User.find({ roles: "63f5bf453e570110746d80b0" }, (err, users) => {
      if (err) {
        res.status(404).send({
          message: "User not found!",
          error: err,
        });
      }
      res.status(200).send({
        message: "Moderator list fetched successfully!",
        userList: users,
      });
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong!",
    });
  }
};

exports.adminBoard = (req, res) => {
  try {
    User.find({ roles: "63f5bf453e570110746d80b1" }, (err, users) => {
      if (err) {
        res.status(404).send({
          message: "User not found!",
          error: err,
        });
      }
      res
        .status(200)
        .send({ message: "Admin list fetched successfully!", userList: users });
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong!",
    });
  }
};

exports.update = async (req, res) => {
  try {
    await User.find({ username: req.body.username }, (err0, users) => {
      if (err0) {
        res.status(404).send({
          message: "User not found!",
          error: err0,
        });
      }
      const UpdateData = async () => {
        await User.updateOne(
          { _id: req.params.id },
          req.body,
          (err, result) => {
            if (err) {
              res.status(500).send({
                message: "Something went wrong!",
              });
            } else {
              res.status(200).send({
                message: "User data udpated successfully!",
                result,
              });
            }
          }
        );
      };
      if (!users.length) {
        UpdateData();
      } else {
        res.status(409).send({
          message: "Username already exist!",
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong!",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await User.find({ username: req.params.username }, (err0, users) => {
      if (err0) {
        res.status(404).send({
          message: "User not found!",
          error: err0,
        });
      } else {
        const DeleteData = async () => {
          await User.deleteOne({ _id: req.params.id }, (err, result) => {
            if (err) {
              res.status(500).send({
                message: "Something went wrong!",
              });
            } else {
              res.status(200).send({
                message: "User deleted successfully!",
                result,
              });
            }
          });
        };
        if (users.length) {
          DeleteData();
        } else {
          res.status(409).send({
            message: "Username not found!",
          });
        }
      }
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong!",
    });
  }
};

exports.forgetPassword = async (req, res) => {
  // try {
  const currentHost = req.body.host;
  if (req.body.username) {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const secret = config.secret + user.password;
      const token = jwt.sign({ username: user.username }, secret, {
        expiresIn: "5m",
      });

      const link = `${
        currentHost.includes("localhost") ? "http://" : "https://"
      }${currentHost}/reset-password?username=${user.username}&token=${token}`;
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "musiur.dev@gmail.com",
          pass: "chheaugdfnutemjz",
        },
      });

      var mailOptions = {
        from: "musiur.opu@gmail.com",
        to: req.body.email ? req.body.email : "musiur.opu@northsouth.edu",
        subject: "Password Reset",
        text: `Click here to reset password: ${link}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.status(500).send({
            message: "Email not sent! Something went wrong!",
          });
        } else {
          // console.log("Email sent: " + info.response);
          res.status(200).send({
            message: "Email sent successfully!",
          });
        }
      });
    } else {
      res.status(404).send({
        message: "Username not found!",
      });
    }
  } else {
    res.status(401).send({
      message: "Username is required!",
    });
  }
  // } catch (error) {
  //   res.status(500).send({
  //     message: "Something went wrong!",
  //     error,
  //   });
  // }
};

exports.resetPasswordVerification = async (req, res) => {
  try {
    const { username, token } = req.params;

    const user = await User.findOne({ username });

    if (user) {
      console.log(user);
      const secret = process.env.JWT_TOKEN + user.password;

      try {
        const verified = jwt.verify(token, secret);
        console.log({ verified });
        if (verified) {
          res.render("index", { username: verify.username });
        } else {
          res.status(401).send({
            message: "Token not verified!",
          });
        }
      } catch (error) {
        res.status(400).send({
          message: "Token not verified!",
        });
      }
    } else {
      res.status(404).send({
        message: "Username not found!",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong!",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { username, token } = req.params;

    console.log({ username, token });

    const user = await User.findOne({ username });

    if (user) {
      const secret = config.secret + user.password;

      let verified = jwt.verify(token, secret);

      if (verified) {
        const encryptedPassword = bcrypt.hashSync(req.body.password, 8);

        try {
          await User.updateOne(
            {
              username: username,
            },
            {
              password: encryptedPassword,
              // password: user.password
            },
            (err) => {
              if (err) {
                res.status(500).send({
                  message: "Something went wrong!",
                });
              } else {
                res.status(200).send({
                  message: "Password reseted successfully",
                });
              }
            }
          );
        } catch (error) {
          res.status(500).send({
            message: "Something went wrong!",
            error,
          });
        }
      } else {
        res.status(401).send({
          message: "Token not verified!",
        });
      }
    } else {
      res.status(404).send({
        message: "Username not found!",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong!",
      error: {
        error,
      },
    });
  }
};
