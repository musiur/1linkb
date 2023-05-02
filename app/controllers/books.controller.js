const Books = require("../models/books.model");

exports.getAll = async (req, res) => {
  await Books.find({}, (err, result) => {
    if (err) {
      res.status(500).send({
        message: "Something went wrong!",
      });
    } else {
      if (result.length) {
        res.status(200).send({
          message: "Books fetched successfully!",
          result,
        });
      } else {
        res.status(404).send({
          message: "No books found!",
        });
      }
    }
  });
};

exports.getSpecific = async (req, res) => {
  const username = req.params.username;
  const pathname = req.params.pathname;
  await Books.find({ username, pathname }, (err, result) => {
    if (err) {
      res.status(500).send({
        message: "Something went wrong!",
      });
    } else {
      if (result.length) {
        res.status(200).send({
          message: "Books fetched successfully!",
          result,
        });
      } else {
        res.status(404).send({
          message: "No books found!",
        });
      }
    }
  });
};

exports.getByPathname = async (req, res) => {
  const pathname = req.params.pathname;
  await Books.find({ pathname }, (err, result) => {
    if (err) {
      res.status(500).send({
        message: "Something went wrong!",
      });
    } else {
      if (result.length) {
        res.status(200).send({
          message: "Books fetched successfully!",
          result,
        });
      } else {
        res.status(404).send({
          message: "No books found!",
        });
      }
    }
  });
};

exports.create = async (req, res) => {
  const createNewBook = async () => {
    const newBook = new Books(req.body);
    await newBook.save((err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "Something went wrong!",
        });
      } else {
        res.status(200).send({
          message: "Book create successfully!",
          result,
        });
      }
    });
  };

  req.body.pathname && req.body.username
    ? createNewBook()
    : res.status(401).send({
        message: "Bad Request!",
      });
};

exports.update = async (req, res) => {
  const _id = req.body._id;
  console.log(req.body);

  const updateBook = async () => {
    await Books.updateOne({ _id }, { ...req.body }, (err) => {
      if (err) {
        res.status(500).send({
          message: "Something went wrong!",
        });
      } else {
        res.status(200).send({
          message: "Books updated successfully!",
        });
      }
    });
  };

  const CheckBooksExistance = async () => {
    await Books.find({ _id }, (err, result) => {
      if (err) {
        res.status(500).send({
          message: "Something went wrong!",
        });
      } else {
        if (result.length) {
          updateBook();
        } else {
          res.status(404).send({
            message: "No books found!",
          });
        }
      }
    });
  };

  _id
    ? CheckBooksExistance()
    : res.status(401).send({
        message: "Bad Request!",
      });
};

exports.delete = async (req, res) => {
  const _id = req.params._id;

  const deleteBook = async () => {
    await Books.deleteOne({ _id }, (err) => {
      if (err) {
        res.status(500).send({
          message: "Something went wrong!",
        });
      } else {
        res.status(200).send({
          message: "Books deleted successfully!",
        });
      }
    });
  };

  const CheckBooksExistance = async () => {
    await Books.find({ _id }, (err, result) => {
      if (err) {
        res.status(500).send({
          message: "Something went wrong!",
        });
      } else {
        if (result.length) {
          deleteBook();
        } else {
          res.status(404).send({
            message: "No books found!",
          });
        }
      }
    });
  };

  _id
    ? CheckBooksExistance()
    : res.status(401).send({
        message: "Bad Request!",
      });
};
