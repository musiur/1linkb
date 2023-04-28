const { authJwt } = require("../middlewares");
const controller = require("../controllers/authorpage.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/authorpage/:pathname", controller.get);
  app.post("/api/authorpage/create", controller.create);
  app.put("/api/authorpage/update", controller.update);
//   app.get("/authorpage", controller.availability);
//   app.put("/authorpage", controller.update);
//   app.delete("/authorpage", controller.delete);
};
