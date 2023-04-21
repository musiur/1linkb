const Authorpage = require("../models/authorpage.model");

exports.get = async (req, res) => {
  console.log(req.params);
  await Authorpage.find({ username: req.params.username }, (err, result) => {
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

exports.create = async (req, res) => {
  const CreateNewAuthorHomePageData = async () => {
    const newAuthorPageData = new Authorpage(req.body);
    await newAuthorPageData.save((err) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "Something went wrong!",
        });
      } else {
        res.status(200).send("Author page data created successfully!");
      }
    });
  };

  const CheckIfUsernameAlreadyUsedOrNot = async () => {
    await Authorpage.find({ username: req.body.username }, (err, result) => {
      if (err) {
        res.status(500).send({
          message: "Something went wrong!",
        });
      } else {
        !result.length
          ? CreateNewAuthorHomePageData()
          : res.status(409).send({
              message: "Username already used!",
            });
      }
    });
  };

  req.body.username
    ? CheckIfUsernameAlreadyUsedOrNot()
    : res.status(401).send({
        message: "Bad Request!",
      });
};

exports.update = (req, res) => {
  const UpdateAuthorHomePageData = async () => {
    await Authorpage.updateOne(
      { username: req.body.username },
      req.body,
      (err, result) => {
        if (err) {
          res.status(500).send({
            message: "Something went wrong!",
          });
        } else {
          res.status(200).send({
            message: "Data updated successfully!",
            result,
          });
        }
      }
    );
  };

  const CheckIfUsernameAlreadyUsedOrNot = async () => {
    await Authorpage.find({ username: req.body.username }, (err, result) => {
      if (err) {
        res.status(500).send({
          message: "Something went wrong!",
        });
      } else {
        result.length
          ? UpdateAuthorHomePageData()
          : res.status(404).send({
              message: "Username not found!",
            });
      }
    });
  };

  req.body.username
    ? CheckIfUsernameAlreadyUsedOrNot()
    : res.status(401).send({
        message: "Bad Request!",
      });
};
