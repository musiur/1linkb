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

//   app.get("/api/links/:pathName", controller.get);
  app.post("/api/author/create", controller.create);
//   app.get("/api/links/availability/:pathName", controller.availability);
//   app.put("/api/links/update/:id", controller.update);
//   app.delete("/api/links/delete/:id", controller.delete);
};
