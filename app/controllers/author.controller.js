const Author = require("../models/author.model");
const User = require("../models/user.model");
const nodemailer = require("nodemailer");

exports.create = async (req, res) => {
  try {
    await User.find({username: req.body.username}, (err, users) => {
        if(err){
            res.status(501).send({
                message: "Something went wrong!",
                error: err
              });
        }else{
            if(users.length){

                const createNewAuthor = async () => {
                    const newAuthor = new Author(req.body);
                    await newAuthor.save((err0) => {
                        if (err0) {
                          res.status(502).send({
                            message: "Something went wrong!",
                            error: err0
                          });
                        } else {
                          res.status(200).send("Author info created successfully!");
                        }
                      });
                }

                const checkAuthorExists = async () => {
                    await Author.find({username: req.body.username}, (authError, authRes) => {
                        if(authError){
                            return res.status(500).send({
                                message: "Something went wrong!",
                                error: authError
                            })
                        }else{
                            if(!authRes.length){
                                createNewAuthor();
                            }else{
                                return res.status(409).send({
                                    message: "Data already exists!",
                                })
                            }
                        }
                    })
                }

                checkAuthorExists();
                
            }else{
                res.status(404).send({
                    message: "No user found!"
                  });
            }
        }
    })
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong!",
    });
  }
};

exports.update = async (req, res) => {
  try{
    await Author.find({username: req.body.username}, (err, data) => {
      if(err){
        res.status(500).send({
          message: "Something went wrong!"
        })
      }else{
        if(data.length){
          const updateAuthorData = async () => {
            await Author.updateOne({username: req.body.username}, req.body, (err1) => {
              if(err1){
                res.status(500).send({
                  message: "Something went wrong!"
                })
              }else{
                res.status(200).send({
                  message: "Data updated successfully!"
                })
              }
            })
          }

          updateAuthorData();

        }else{
          res.status(404).send({
            message: "Data not found!"
          })
        }
      }
    })
  }catch(error){
    res.status(500).send({
      message: "Something went wrong!"
    })
  }
}

exports.get = async (req, res) => {
  try{
    console.log(req.body)
    await Author.findOne({username: req.body.username}, (err, data) =>{
      if(err){
        res.status(500).send({
          message: "Something went wrong!"
        })
      }else{
        console.log(data)
        if(data){
          res.status(200).send({
            message: "Data fetch successfully!",
            data
          })
        }else{
          res.status(404).send({
            message: "Data not found!"
          })
        }
      }
    })
  }catch(error){
    res.status(500).send({
      message: "Something went wrong!"
    })
  }
}

exports.delete = async (req, res) => {
  const deleteAuthorData = async () => {
    await Author.deleteOne({ username: req.body.username }, (err, result) => {
      if (err) {
        res.status(500).send({
          message: "Something went wrong!",
        });
      } else {
        res.status(200).send({
          message: "Link deleted successfully!",
          result,
        });
      }
    });
  }

  try{
    await Author.findOne({username: req.body.username}, (err, data) =>{
      if(err){
        res.status(500).send({
          message: "Something went wrong!"
        })
      }else{
        if(data){
          deleteAuthorData();
        }else{
          res.status(404).send({
            message: "Data not found!"
          })
        }
      }
    })
  }catch(error){
    res.status(500).send({
      message: "Something went wrong!"
    })
  }
  
};

exports.mailing = async (req, res) => {
  try{
    const {username, to, subject, message, from, name} = req.body;

    const SendMail = () => {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "musiur.dev@gmail.com",
          pass: "chheaugdfnutemjz",
        },
      });

      var mailOptions = {
        from,
        to,
        subject,
        text: message,
      };

      transporter.sendMail(mailOptions, function (error) {
        if (error) {
          res.status(500).send({
            message: "Email not sent! Something went wrong!",
          });
        } else {
          res.status(200).send({
            message: "Email sent successfully!",
          });
        }
      });
    }

    await User.findOne({username}, (err, data) => {
      if(err){
        res.status(500).send({
          message: "Something went wrong!"
        })
      }else{
        if(data){
          SendMail();
        }else{
          res.status(404).send({
            message: "User not found!"
          })
        }
      }
    })

  }catch(error){
    res.status(500).send({
      message: "Something went wrong!"
    })
  }
}
