// const { authJwt } = require("../middlewares");
const controller = require("../controllers/newsletters.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/newsletters/:pathname", controller.get);
  app.post("/api/newsletters/create", controller.create);
  app.put("/api/newsletters/update", controller.update);
};
