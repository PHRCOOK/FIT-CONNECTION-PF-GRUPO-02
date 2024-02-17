const { Router } = require("express");
const upload = require("../services/multer");

const {
  getProductServicesByIdHandler,
  createProductServicesHandler,
  updateProductServicesHandler,
  productFilterAndOrderHandler,
} = require("../handlers/productsHandlers");

const productsRouter = Router();

// Rutas específicas primero

productsRouter.get('/', productFilterAndOrderHandler);      //<---------------- RUTA DE FILTROS Y ORDENAMIENTO!!!

// Rutas generales después
productsRouter.get("/:id", getProductServicesByIdHandler);
productsRouter.post("/", upload.single('image_url'), createProductServicesHandler);
productsRouter.put("/update/:id", updateProductServicesHandler);

module.exports = productsRouter;
