module.exports = app => {
  const encuestas = require("../controllers/encuesta.controller.js");
  const respuestas = require("../controllers/respuesta.controller.js");
  const router = require("express").Router();

  router.post("/", encuestas.create);
  router.get("/", encuestas.findAll);
  router.get("/resumen", encuestas.resumenTodas);
  router.get("/:id", encuestas.findOne);
  router.get("/:id/resumen", encuestas.resumen);
  router.delete("/:id", encuestas.delete);

  router.post("/:encuestaId/respuestas", respuestas.create);
  router.get("/:encuestaId/respuestas", respuestas.findAll);

  app.use("/api/encuestas", router);
};