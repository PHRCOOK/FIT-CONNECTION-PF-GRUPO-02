const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/fitconnection`, {
  logging: false,
  native: false,
});

const modelDefiners = [];

// Función recursiva para leer modelos en carpetas y subcarpetas
const readModels = (folderPath) => {
  fs.readdirSync(folderPath)
    .forEach((file) => {
      const filePath = path.join(folderPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        // Si es una carpeta, llamamos recursivamente a la función para leer modelos en esa carpeta
        readModels(filePath);
      } else if (file.slice(-3) === '.js') {
        // Si es un archivo JavaScript en la carpeta, lo agregamos a los modelDefiners
        modelDefiners.push(require(filePath));
      }
    });
};

// Llamamos a la función inicialmente con la ruta de la carpeta 'models'
readModels(path.join(__dirname, '/models'));

// Injectamos la conexión (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Capitalizamos los nombres de los modelos
const entries = Object.entries(sequelize.models);
const capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Log de los modelos cargados
console.log(sequelize.models);

// Destructuring de los modelos
const { Users, Producto, Client_info, Categoria, Shopping_cart, Purchases, Purchase_detail } = sequelize.models;
// Aca vendrian las relaciones

//Users y Detail
Users.hasMany(Client_info, { onDelete: 'CASCADE' });
Client_info.belongsTo(Users);
//Users y Shopping_card
Shopping_cart.belongsTo(Users);
Users.hasMany(Shopping_cart);
//Purchases y Purchase_details
Purchases.hasMany(Purchase_detail)
Purchase_detail.belongsTo(Purchases)
//instructory feedback

//users y feedback

//Users y Purchases
Users.hasMany(Purchases);
Purchases.belongsTo(Users);
//Producto y Shopping_card
Shopping_cart.belongsTo(Producto);
Producto.hasMany(Shopping_cart);
//Categoria y producto
Producto.belongsTo(Categoria);
Categoria.hasMany(Producto);



module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conection: sequelize,     // para importart la conexión { conn } = require('./db.js');
}