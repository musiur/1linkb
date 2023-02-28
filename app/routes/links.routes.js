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

  app.get("/api/links", [authJwt.verifyToken, authJwt.isModerator], controller.get);
  app.post("/api/links/create", [authJwt.verifyToken], controller.create);
  app.put("/api/links/update/:id", controller.update);
  app.delete("/api/links/delete/:id", [authJwt.verifyToken], controller.delete);

};
