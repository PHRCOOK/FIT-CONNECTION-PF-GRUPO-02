const { Router } = require("express");

const {
  getProductServicesHandler,
  getProductServicesByIdHandler,
  createProductServicesHandler,
  updateProductServicesHandler,
  deleteProductServicesHandler,
  productFilterAndOrderHandler,
} = require("../handlers/productsHandlers");

const productsRouter = Router();

// Rutas específicas primero
productsRouter.get("/", productFilterAndOrderHandler); //<---------------- RUTA DE FILTROS Y ORDENAMIENTO!!!

// Rutas generales después
productsRouter.get("/", getProductServicesHandler);
productsRouter.get("/:id", getProductServicesByIdHandler);
productsRouter.post("/", createProductServicesHandler);
productsRouter.put("/update/:id", updateProductServicesHandler);
productsRouter.delete("/delete/:id", deleteProductServicesHandler);

module.exports = productsRouter;
