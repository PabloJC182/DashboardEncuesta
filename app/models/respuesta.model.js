module.exports = (sequelize, Sequelize) => {
  const Respuesta = sequelize.define("respuesta", {
    valor: {
      type: Sequelize.STRING, // "si"/"no" o "1".."10" según el tipo de la encuesta
      allowNull: false
    }
  });
  return Respuesta;
};