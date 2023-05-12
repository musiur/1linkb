const Newsletters = require("../models/newsletters.model");

// get the newsletters container for individual author
exports.get = async (req, res) => {
  await Newsletters.find({ pathname: req.params.pathname }, (error, result) => {
    if (error) {
      res.status(500).send({
        message: "Something went wrong!",
      });
    } else {
      if (result.length) {
        res.status(200).send({
          message: "Email fetch successful!",
          result,
        });
      } else {
        res.status(400).send({
          message: "No emails are available!",
        });
      }
    }
  });
};

// creating newsletters container for individual author
exports.create = (req, res) => {
  const AddNewsletters = async () => {
    const newNewsletter = new Newsletters(req.body);
    await newNewsletter.save((err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "Something went wrong!",
        });
      } else {
        res.status(200).send({
          message: "Newsletter created successfully!",
          result,
        });
      }
    });
  };

  const PathnameCheck = async () => {
    await Newsletters.find({ pathname: req.body.pathname }, (error, result) => {
      if (error) {
        res.status(500).send({
          message: "Something went wrong!",
        });
      } else {
        if (result.length) {
          res.status(409).send({
            message: "Pathname already used!",
          });
        } else {
          AddNewsletters();
          // res.status(200).send({
          //     message: "Can create new newsletter!"
          // })
        }
      }
    });
  };

  req.body.pathname && req.body.username
    ? PathnameCheck()
    : res.status(401).send({
        message: "Bad Request!",
      });
};

// updating newsletters container for individual author
exports.update = (req, res) => {
  const UpdateNewsletter = async (data) => {
    await Newsletters.updateOne(
      { pathname: req.body.pathname },
      data,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send({
            message: "Something went wrong!",
          });
        } else {
          res.status(200).send({
            message: "Newsletter updated successfully!",
            result,
          });
        }
      }
    );
  };
  const FindNewsletter = async () => {
    await Newsletters.find({ pathname: req.body.pathname }, (error, result) => {
      if (error) {
        res.status(500).send({
          message: "Something went wrong!",
        });
      } else {
        if (result.length) {
          let newsletterFromDB = result[0];
          if (
            !newsletterFromDB.emails.filter((email) => email === req.body.email).length
          ) {
            newsletterFromDB.emails.push(req.body.email);

            UpdateNewsletter(newsletterFromDB);
          } else {
            res.status(409).send({
              message: "This email already added!",
            });
          }
        } else {
          res.status(404).send({
            message: "Emails not found!",
          });
        }
      }
    });
  };

  const PathnameCheck = async () => {
    await Newsletters.find({ pathname: req.body.pathname }, (error, result) => {
      if (error) {
        res.status(500).send({
          message: "Something went wrong!",
        });
      } else {
        if (result.length) {
          FindNewsletter();
        } else {
          res.status(404).send({
            message: "Newsletters container not found, create first!",
          });
        }
      }
    });
  };

  req.body.pathname && req.body.username
    ? PathnameCheck()
    : res.status(401).send({
        message: "Bad Request!",
      });
};
