const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user/all", controller.all);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/moderator",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.put(
    "/api/test/user/update/:id",
    [authJwt.verifyToken],
    controller.update
  );

  app.delete("/api/test/user/delete/:username/:id", controller.delete);

  app.post("/api/test/user/forget-password", controller.forgetPassword);
  // app.get("/api/test/user/reset-password/:username/:token", controller.resetPasswordVerification);
  app.post("/api/test/user/reset-password/:username/:token", controller.resetPassword);
};
