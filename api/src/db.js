require("dotenv").config();
const { Sequelize } = require("sequelize");
const DataFunction = require("./model/datos.js");
const UserFunction = require("./model/user.js");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    { logging: false }
);


DataFunction(sequelize);
UserFunction(sequelize);
// Llama a DataFunction para definir el modelo y asócialo a sequelize
const { Datos, User } = sequelize.models;

User.hasMany(Datos);
Datos.belongsTo(User);

module.exports = {
    sequelize,
    ...sequelize.models,
};
