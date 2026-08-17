module.exports = (sequelize, Sequelize) => {
  const Encuesta = sequelize.define("encuesta", {
    pregunta: {
      type: Sequelize.STRING,
      allowNull: false
    },
    tipo: {
      type: Sequelize.STRING, // "si_no" | "escala"
      allowNull: false
    }
  });
  return Encuesta;
};