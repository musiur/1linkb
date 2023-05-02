
const controller = require("../controllers/books.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/books/all", controller.getAll);
  app.get("/api/books/:pathname", controller.getByPathname);
  app.get("/api/books/:username/:pathname", controller.getSpecific);
  app.post("/api/books/create", controller.create);
  app.put("/api/books/update", controller.update);
  app.delete("/api/books/delete/:_id", controller.delete);
};
