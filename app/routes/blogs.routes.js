const { authJwt } = require("../middlewares");
const controller = require("../controllers/blogs.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/blogs/all", controller.getAll);
  app.post("/api/blogs/create", controller.create);
  app.put("/api/blogs/update", controller.update);
  app.delete("/api/blogs/delete/:_id", controller.delete);
  //   app.post("/api/blogs/mail", controller.mailing);
};
