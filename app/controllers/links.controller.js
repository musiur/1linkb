const Authorpage = require("../models/authorpage.model");
const Links = require("../models/links.model");

exports.create = async (req, res) => {
  const updateAuthorpagePathname = async () => {
    await Authorpage.find({ username: req.body.username }, (err, result) => {
      if (err) {
        res.status(500).send({
          message: "Something went wrong in authorpage data update operation!",
        });
      } else {
        const updatePathname = async () => {
          await Authorpage.updateOne(
            { username: req.body.username },
            { pathname: req.body.pathname },
            (err) => {
              if (err) {
                res.status(500).send({
                  message:
                    "Something went wrong in authorpage data update operation!",
                });
              } else {
                return true;
              }
            }
          );
        };
        if (result.length) {
          updatePathname();
        } else {
          return true;
        }
      }
    });
  };

  const createNewLink = async () => {
    if (updateAuthorpagePathname()) {
      const newLink = new Links(req.body);
      await newLink.save((err) => {
        if (err) {
          res.status(500).send({
            message: "Something went wrong in creating new link in DB!",
          });
        } else {
          res.status(200).send("Link created successfully!");
        }
      });
    } else {
      res.status(500).send({
        message: "Something went wrong in authorpage data update operation!",
      });
    }
  };

  const deleteLink = async () => {
    await Links.deleteMany({ username: req.body.username }, (err) => {
      if (err) {
        res.status(500).send({
          message: "Something went wrong in deleting previous links!",
        });
      } else {
        createNewLink();
      }
    });
  };
  const findUser = async () => {
    await Links.find({ username: req.body.username }, (err, result) => {
      if (err) {
        res.status(500).send({
          message: "Something went wrong in finding links!",
        });
      } else {
        if (result.length) {
          deleteLink();
        } else {
          createNewLink();
        }
      }
    });
  };

  Object.keys(req.body).length
    ? findUser()
    : res.status(401).send({
        message: "Bad request!",
      });
};

exports.availability = async (req, res) => {
  await Links.find({ pathname: req.params.pathName }, (err, result) => {
    if (err) {
      res.status(500).send({
        message: "Something went wrong!",
      });
    } else {
      if (result.length) {
        res.status(409).send({
          message: "Not available!",
        });
      } else {
        res.status(200).send({
          message: "Link available!",
        });
      }
    }
  });
};

exports.get = async (req, res) => {
  await Links.find({ pathname: req.params.pathName }, (err, result) => {
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

exports.getusername = async (req, res) => {
  await Links.find({ username: req.params.username }, (err, result) => {
    if (err) {
      res.status(500).send({
        message: "Something went wrong!",
      });
    } else {
      if (result.length) {
        res.status(200).send(result[0].pathname);
      } else {
        res.status(404).send({
          message: "No link found!",
        });
      }
    }
  });
};

exports.update = async (req, res) => {
  await Links.updateOne(
    { _id: req.params.id },
    { pathname: req.body.pathname },
    (err, result) => {
      if (err) {
        res.status(500).send({
          message: "Something went wrong!",
        });
      } else {
        res.status(200).send({
          message: "Link udpated successfully!",
          result,
        });
      }
    }
  );
};

exports.delete = async (req, res) => {
  await Links.deleteOne({ _id: req.params.id }, (err, result) => {
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
};
