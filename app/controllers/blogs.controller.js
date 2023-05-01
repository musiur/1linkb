const Blogs = require("../models/blogs.model");

exports.getAll = async (req, res) => {
  await Blogs.find({}, (err, result) => {
    if (err) {
      res.status(500).send({
        message: "Something went wrong!",
      });
    } else {
      if (result.length) {
        res.status(200).send({
          message: "Blogs fetched successfully!",
          result,
        });
      } else {
        res.status(404).send({
          message: "No blogs found!",
        });
      }
    }
  });
};

exports.getSpecific = async (req, res) => {
  const username = req.params.username;
  const pathname = req.params.pathname;
  await Blogs.find({ username, pathname }, (err, result) => {
    if (err) {
      res.status(500).send({
        message: "Something went wrong!",
      });
    } else {
      if (result.length) {
        res.status(200).send({
          message: "Blogs fetched successfully!",
          result,
        });
      } else {
        res.status(404).send({
          message: "No blogs found!",
        });
      }
    }
  });
};

exports.getByPathname = async (req, res) => {
  const pathname = req.params.pathname;
  await Blogs.find({ pathname }, (err, result) => {
    if (err) {
      res.status(500).send({
        message: "Something went wrong!",
      });
    } else {
      if (result.length) {
        res.status(200).send({
          message: "Blogs fetched successfully!",
          result,
        });
      } else {
        res.status(404).send({
          message: "No blogs found!",
        });
      }
    }
  });
};

exports.create = async (req, res) => {
  const createNewBlog = async () => {
    const newBlog = new Blogs(req.body);
    await newBlog.save((err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "Something went wrong!",
        });
      } else {
        res.status(200).send({
          message: "Blog create successfully!",
          result,
        });
      }
    });
  };

  req.body.pathname && req.body.username
    ? createNewBlog()
    : res.status(401).send({
        message: "Bad Request!",
      });
};

exports.update = async (req, res) => {
  const _id = req.body._id;
  console.log(req.body);

  const updateBlog = async () => {
    await Blogs.updateOne({ _id }, { ...req.body }, (err) => {
      if (err) {
        res.status(500).send({
          message: "Something went wrong!",
        });
      } else {
        res.status(200).send({
          message: "Blogs updated successfully!",
        });
      }
    });
  };

  const CheckBlogsExistance = async () => {
    await Blogs.find({ _id }, (err, result) => {
      if (err) {
        res.status(500).send({
          message: "Something went wrong!",
        });
      } else {
        if (result.length) {
          updateBlog();
        } else {
          res.status(404).send({
            message: "No blogs found!",
          });
        }
      }
    });
  };

  _id
    ? CheckBlogsExistance()
    : res.status(401).send({
        message: "Bad Request!",
      });
};

exports.delete = async (req, res) => {
  const _id = req.params._id;

  const deleteBlog = async () => {
    await Blogs.deleteOne({ _id }, (err) => {
      if (err) {
        res.status(500).send({
          message: "Something went wrong!",
        });
      } else {
        res.status(200).send({
          message: "Blogs deleted successfully!",
        });
      }
    });
  };

  const CheckBlogsExistance = async () => {
    await Blogs.find({ _id }, (err, result) => {
      if (err) {
        res.status(500).send({
          message: "Something went wrong!",
        });
      } else {
        if (result.length) {
          deleteBlog();
        } else {
          res.status(404).send({
            message: "No blogs found!",
          });
        }
      }
    });
  };

  _id
    ? CheckBlogsExistance()
    : res.status(401).send({
        message: "Bad Request!",
      });
};
