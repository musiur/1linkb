// const { authJwt } = require("../middlewares");
const controller = require("../controllers/giveway.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/giveway/:pathname", controller.get);
  app.post("/api/giveway/create", controller.create);
  app.put("/api/giveway/update", controller.update);
  app.put("/api/giveway/delete/:username/:pathname", controller.delete);
};
