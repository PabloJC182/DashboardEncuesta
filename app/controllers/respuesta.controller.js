const db = require("../models");
const Respuesta = db.respuestas;

exports.create = (req, res) => {
  const encuestaId = req.params.encuestaId;
  if (req.body.valor === undefined) {
    return res.status(400).send({ message: "valor es requerido." });
  }
  Respuesta.create({ valor: req.body.valor, encuestaId })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  Respuesta.findAll({ where: { encuestaId: req.params.encuestaId } })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};