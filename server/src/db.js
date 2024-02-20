require("dotenv").config()
const { Sequelize } = require("sequelize");
const UserModel = require("./models/UserModel");
const GymModel = require("./models/GymModel");
const InstructorModel = require("./models/InstructorModel");
const ClientInfoModel = require("./models/ClientInfoModel");
const FeedBackModel = require("./models/FeedBackModel");
const PurchasesModel = require("./models/PurchasesModel");
const PurchaseDetailModel = require("./models/PurchaseDetailModel");
const ShoppingCartModel = require("./models/ShoppingCartModel");
const CategoriesModel = require("./models/CategoriesModel");
const ProductServicesModel = require("./models/ProductServicesModel");

//! IMPORTANTE IMPORTANTE IMPORTANTE

// NO CAMBIAR LO SIGUIENTE O SE CAE EL SERVIDOR WEB
// TAMBIEN CREEN LA VARIABLE DB_PORT EN dotenv

const { DB_USER, DB_PASSWORD, DB_HOST, BDD, DB_PORT } = process.env; // Agrego en el archivo .env nombre de la base de datos por si de pronto alguien usa un nombre diferente el estandar seria llamarla "fitconnection".

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${BDD}`,
  {
    logging: false,
    native: false,
  }
);

// HASTA AQUI

// Definimos los modelos.
UserModel(sequelize); // Se ejecutan los modelos con la instancia de sequelize.
GymModel(sequelize);
InstructorModel(sequelize);
ClientInfoModel(sequelize);
FeedBackModel(sequelize);
PurchasesModel(sequelize);
PurchaseDetailModel(sequelize);
ShoppingCartModel(sequelize);
CategoriesModel(sequelize);
ProductServicesModel(sequelize);

//relaciones de la BDD
const {
  User,
  ClientInfo,
  ShoppingCart,
  Purchases,
  FeedBack,
  ProductServices,
  Categories,
  PurchaseDetail,
  Instructor,
} = sequelize.models;

//* Relaciones del modelo User

User.hasOne(ClientInfo, { as: "ClientInfo", foreignKey: "user_id" });
User.hasMany(ShoppingCart, { as: "ShoppingCart", foreignKey: "user_id" });
User.hasMany(Purchases, { as: "Purchases", foreignKey: "user_id" });
User.hasMany(FeedBack, { as: "FeedBack", foreignKey: "user_id" });

//* Relaciones del modelo Products_services
ProductServices.hasMany(ShoppingCart, {
  as: "ShoppingCarts",
  as: "ShoppingCart",
  foreignKey: "product_id",
});

ProductServices.hasOne(PurchaseDetail, {
  as: "PurchaseDetail",
  foreignKey: "product_id",
});

ProductServices.belongsTo(Categories, {
  as: "Categories",
  foreignKey: "category_id",
});

//* Relaciones del modelo categories
Categories.hasMany(ProductServices, {
  as: "ProductServices",
  foreignKey: "category_id",
});

//* Relaciones del modelo Purchases

Purchases.hasMany(PurchaseDetail, {
  as: "PurchaseDetail",
  foreignKey: "purchase_id",
});

//* Relaciones del modelo Instrutor
Instructor.hasMany(FeedBack, { as: "FeedBack", foreignKey: "instructor_id" });

// Relaciones en el modelo FeedBack.
FeedBack.belongsTo(User, { as: "User", foreignKey: "user_id" });
FeedBack.belongsTo(Instructor, {
  as: "Instructor",
  foreignKey: "instructor_id",
});

// Relación del modelo ClientInfo.
ClientInfo.belongsTo(User, { as: 'User', foreignKey: 'user_id' });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
  sequelize,
};
