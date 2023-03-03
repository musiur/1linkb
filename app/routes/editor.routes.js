const { authJwt } = require("../middlewares");
const controller = require("../controllers/editor.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/editor/:username",
    // [authJwt.verifyToken, authJwt.isModerator],
    controller.get
  );
  app.post("/api/editor/create", controller.create);
  app.put("/api/editor/update/:username", controller.update);
  app.delete(
    "/api/editor/delete/:id",
    [authJwt.verifyToken],
    controller.delete
  );
};
