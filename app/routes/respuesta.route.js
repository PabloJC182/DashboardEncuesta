module.exports = app => {
  const respuestas = require("../controllers/respuesta.controller.js");
  const router = require("express").Router();

  router.post("/", respuestas.create);
  router.get("/stats", respuestas.stats);
  router.get("/", respuestas.findAll);
  router.delete("/:id", respuestas.delete);

  app.use("/api/encuesta", router);
};