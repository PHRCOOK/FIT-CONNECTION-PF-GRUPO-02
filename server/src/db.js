const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/gym`, {
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
const { Usuarios, } = sequelize.models;
// Aca vendrian las relaciones
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
}