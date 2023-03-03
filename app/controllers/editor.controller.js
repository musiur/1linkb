const Editor = require("../models/editor.model");

exports.create = async (req, res) => {
  try {
    const CreateDataInDB = async () => {
      const newEditorData = new Editor(req.body);
      await newEditorData.save((err) => {
        if (err) {
          res.status(500).send({
            message: "Something went wrong!",
          });
        } else {
          res.status(200).send({
            message: "Data saved successfully!",
          });
        }
      });
    };

    await Editor.find({ username: req.body.username }, (err, result) => {
      if (err) {
        res.status(500).send({
          message: "Something went wrong!",
        });
      } else {
        if (result.length) {
          res.status(409).send({
            message: "Something went wrong!",
          });
        } else {
          CreateDataInDB();
        }
      }
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong!",
      error,
    });
  }
};

exports.get = async (req, res) => {
  try {
    await Editor.find({ username: req.params.username }, (err, result) => {
      if (err) {
        res.status(500).send({
          message: "Something went wrong!",
        });
      } else {
        if (result.length) {
          res.status(200).send({
            message: "Editor data fetched successfully!",
            result,
          });
        } else {
          res.status(500).send({
            message: "Something went wrong!",
          });
        }
      }
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong!",
      error,
    });
  }
};

exports.update = async (req, res) => {
  console.log({ payload: req.body });
  try {
    const UpdateDataInDB = async () => {
      await Editor.updateOne(
        { username: req.params.username },
        req.body,
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

    await Editor.find({ username: req.body.username }, (err, result) => {
      if (err) {
        res.status(500).send({
          message: "Something went wrong!",
        });
      } else {
        if (result.length) {
          UpdateDataInDB();
        } else {
          res.status(404).send({
            message: "Data not found in DB!",
          });
        }
      }
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong!",
      error,
    });
  }
};

exports.delete = async (req, res) => {
  await Editor.updateOne({ _id: req.params.id }, (err, result) => {
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
