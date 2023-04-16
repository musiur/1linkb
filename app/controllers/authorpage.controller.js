const Authorpage = require("../models/authorpage.model");

exports.get = (req, res) => {
  res.status(200).send({
    message: "200",
  });
};

exports.create = async (req, res) => {
  const newAuthorPageData = new Authorpage(req.body);
  await newAuthorPageData.save((err) => {
    if (err) {
      console.log(err)
      res.status(500).send({
        message: "Something went wrong!",
      });
    } else {
      res.status(200).send("Author page data created successfully!");
    }
  });
};
