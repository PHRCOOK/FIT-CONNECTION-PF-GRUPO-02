const { Router } = require("express");
const upload = require("../services/multer");

const {
  getProductServicesByIdHandler,
  createProductServicesHandler,
  updateProductServicesHandler,
  productFilterAndOrderHandler,
} = require("../handlers/productsHandlers");

const productsRouter = Router();
const { authorization } = require('../../utils/auth')
// Rutas específicas primero

productsRouter.get('/', productFilterAndOrderHandler);      //<---------------- RUTA DE FILTROS Y ORDENAMIENTO!!!

// Rutas generales después
productsRouter.get("/:id", getProductServicesByIdHandler);
productsRouter.post("/", authorization, upload.single('image_url'), createProductServicesHandler);
productsRouter.put("/update/:id", authorization, updateProductServicesHandler);

module.exports = productsRouter;
