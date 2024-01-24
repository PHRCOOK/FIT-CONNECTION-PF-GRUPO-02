require('dotenv').config();
const { Sequelize } = require('sequelize');
const UserModel = require("./models/UserModel");
const GymModel = require("./models/GymModel");
const InstrutorModel = require("./models/InstructorModel");
const ClientInfoModel = require("./models/ClientInfoModel");
const FeedBackModel = require("./models/FeedBackModel");
const PurchasesModel = require("./models/PurchasesModel");
const PurchaseDetailModel = require("./models/PurchaseDetailModel");
const ShoppingCartModel = require("./models/ShoppingCartModel");
const CategoriesModel = require("./models/CategoriesModel");
const ProductServiesModel = require("./models/ProductServicesModel");

const { DB_USER, DB_PASSWORD, DB_HOST, BDD } = process.env; // Agrego en el archivo .env nombre de la base de datos por si de pronto alguien usa un nombre diferente el estandar seria llamarla "fitconnection".


const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${BDD}`,
    { logging: false, native: false }
);

// Definimos los modelos.
UserModel(sequelize); // Se ejecutan los modelos con la instancia de sequelize.
GymModel(sequelize);
InstrutorModel(sequelize);
ClientInfoModel(sequelize);
FeedBackModel(sequelize);
PurchasesModel(sequelize);
PurchaseDetailModel(sequelize);
ShoppingCartModel(sequelize);
CategoriesModel(sequelize);
ProductServiesModel(sequelize);


module.exports = {
   ...sequelize.models,
    conn: sequelize,
};

