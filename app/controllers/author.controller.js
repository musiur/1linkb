const Author = require("../models/author.model");
const User = require("../models/user.model");

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
