const Giveway = require("../models/giveway.model");

// get the giveway container for individual author
exports.get = async (req, res) => {
  await Giveway.find({ pathname: req.params.pathname }, (error, result) => {
    if (error) {
      res.status(500).send({
        message: "Something went wrong!",
      });
    } else {
      if (result.length) {
        res.status(200).send({
          message: "Giveway resources fetch successful!",
          result,
        });
      } else {
        res.status(404).send({
          message: "Giveway resources are not available!",
        });
      }
    }
  });
};



// creating giveway container for individual author
exports.create = (req, res) => {
  const addNewGiveway = async () => {
    const newGiveway = new Giveway(req.body);
    await newGiveway.save((err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "Something went wrong!",
        });
      } else {
        res.status(200).send({
          message: "Giveway file created successfully!",
          result,
        });
      }
    });
  };

  const PathnameCheck = async () => {
    await Giveway.find({ pathname: req.body.pathname }, (error, result) => {
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
          addNewGiveway();
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

// updating giveway container for individual author
exports.update = (req, res) => {
  const UpdateGiveway = async () => {
    await Giveway.updateOne(
      { pathname: req.body.pathname },
      req.body,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send({
            message: "Something went wrong!",
          });
        } else {
          res.status(200).send({
            message: "Giveway file updated successfully!",
            result,
          });
        }
      }
    );
  };
  const FindGiveway = async () => {
    await Giveway.find({ pathname: req.body.pathname }, (error, result) => {
      if (error) {
        res.status(500).send({
          message: "Something went wrong!",
        });
      } else {
        if (result.length) {
          UpdateGiveway();
        } else {
          res.status(404).send({
            message: "Emails not found!",
          });
        }
      }
    });
  };

  const PathnameCheck = async () => {
    await Giveway.find({ pathname: req.body.pathname }, (error, result) => {
      if (error) {
        res.status(500).send({
          message: "Something went wrong!",
        });
      } else {
        if (result.length) {
          FindGiveway();
        } else {
          res.status(404).send({
            message: "Giveway container not found, create first!",
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

// deleting giveway container for individual author
exports.delete = (req, res) => {
  const deleteGiveway = async (data) => {
    await Giveway.deleteOne({ pathname: req.params.pathname }, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "Something went wrong!",
        });
      } else {
        res.status(200).send({
          message: "Giveway file deleted successfully!",
        });
      }
    });
  };
  const FindGiveway = async () => {
    await Giveway.find({ pathname: req.params.pathname }, (error, result) => {
      if (error) {
        res.status(500).send({
          message: "Something went wrong!",
        });
      } else {
        if (result.length) {
          deleteGiveway();
        } else {
          res.status(404).send({
            message: "Giveway file not found!",
          });
        }
      }
    });
  };

  const PathnameCheck = async () => {
    await Giveway.find({ pathname: req.params.pathname }, (error, result) => {
      if (error) {
        res.status(500).send({
          message: "Something went wrong!",
        });
      } else {
        if (result.length) {
          FindGiveway();
        } else {
          res.status(404).send({
            message: "Giveway container not found, create first!",
          });
        }
      }
    });
  };

  req.params.pathname && req.params.username
    ? PathnameCheck()
    : res.status(401).send({
        message: "Bad Request!",
      });
};
