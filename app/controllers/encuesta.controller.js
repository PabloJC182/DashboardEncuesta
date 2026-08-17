const db = require("../models");
const Encuesta = db.encuestas;
const Respuesta = db.respuestas;

exports.create = (req, res) => {
  if (!req.body.pregunta || !req.body.tipo) {
    return res.status(400).send({ message: "pregunta y tipo son requeridos." });
  }
  Encuesta.create({ pregunta: req.body.pregunta, tipo: req.body.tipo })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  Encuesta.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
  Encuesta.findByPk(req.params.id)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  Encuesta.destroy({ where: { id: req.params.id } })
    .then(num => res.send({ message: num === 1 ? "Eliminada." : "No encontrada." }))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Resumen de UNA encuesta: cuántos respondieron y conteo por valor
exports.resumen = async (req, res) => {
  try {
    const encuesta = await Encuesta.findByPk(req.params.id);
    if (!encuesta) return res.status(404).send({ message: "No encontrada." });

    const respuestas = await Respuesta.findAll({ where: { encuestaId: req.params.id } });
    const conteo = {};
    respuestas.forEach(r => {
      conteo[r.valor] = (conteo[r.valor] || 0) + 1;
    });

    res.send({
      id: encuesta.id,
      pregunta: encuesta.pregunta,
      tipo: encuesta.tipo,
      total: respuestas.length,
      conteo
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Resumen de TODAS las encuestas (usado por el dashboard)
exports.resumenTodas = async (req, res) => {
  try {
    const encuestas = await Encuesta.findAll();
    const resultado = [];

    for (const e of encuestas) {
      const respuestas = await Respuesta.findAll({ where: { encuestaId: e.id } });
      const conteo = {};
      respuestas.forEach(r => {
        conteo[r.valor] = (conteo[r.valor] || 0) + 1;
      });
      resultado.push({
        id: e.id,
        pregunta: e.pregunta,
        tipo: e.tipo,
        total: respuestas.length,
        conteo
      });
    }

    res.send(resultado);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};