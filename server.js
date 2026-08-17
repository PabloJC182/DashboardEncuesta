const dotenv = require("dotenv");
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
dotenv.config({ path: envFile });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

require("./app/routes/encuesta.route")(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server corriendo en puerto ${PORT}`);
});