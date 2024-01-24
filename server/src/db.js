require('dotenv').config();
const { Sequelize } = require('sequelize');
const UserModel = require("./models/UserModel");
const { DB_USER, DB_PASSWORD, DB_HOST, BDD } = process.env; // Agrego en el archivo .env nombre de la base de datos por si de pronto alguien usa un nombre diferente el estandar seria llamarla "fitconnection".


const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${BDD}`,
    { logging: false, native: false }
);

// Definimos los modelos.
UserModel(sequelize); // Se ejecutan los modelos con la instancia de sequelize.

module.exports = {
   ...sequelize.models,
    conn: sequelize,
};

