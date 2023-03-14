const { authJwt } = require("../middlewares");
const controller = require("../controllers/author.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/author", controller.get);
  app.post("/api/author/create", controller.create);
  app.put("/api/author/update", controller.update);
  app.delete("/api/author/delete", controller.delete);
  app.post("/api/author/mail", controller.mailing);
};
