const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelizeOptions = {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool
};

if (dbConfig.ssl) {
  sequelizeOptions.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  };
}

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, sequelizeOptions);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.encuestas = require("./encuesta.model.js")(sequelize, Sequelize);
db.respuestas = require("./respuesta.model.js")(sequelize, Sequelize);

db.encuestas.hasMany(db.respuestas, { as: "respuestas", foreignKey: "encuestaId" });
db.respuestas.belongsTo(db.encuestas, { foreignKey: "encuestaId", as: "encuesta" });

module.exports = db;