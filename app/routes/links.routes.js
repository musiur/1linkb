const { authJwt } = require("../middlewares");
const controller = require("../controllers/links.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // app.get("/api/links", controller.allAccess);
  app.post("/api/links/create", controller.create);

  // app.get("/api/links/signle", [authJwt.verifyToken], controller.userBoard);

};
