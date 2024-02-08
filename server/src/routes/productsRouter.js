const { Router } = require("express");
const upload = require("../services/multer");
const { requiresAuth } = require("express-openid-connect");

const {
  getProductServicesHandler,
  getProductServicesByIdHandler,
  createProductServicesHandler,
  updateProductServicesHandler,
  deleteProductServicesHandler,
  productFilterAndOrderHandler,
} = require("../handlers/productsHandlers");

const productsRouter = Router();

// Solo los usuarios autenticados pueden obtener los productos con filtros y ordenamiento
productsRouter.get("/", requiresAuth(), productFilterAndOrderHandler);

// Solo los usuarios autenticados pueden obtener los detalles de un producto
productsRouter.get("/:id", requiresAuth(), getProductServicesByIdHandler);

// Solo los usuarios autenticados pueden crear un producto
productsRouter.post(
  "/",
  requiresAuth(),
  upload.single("image_url"),
  createProductServicesHandler
);

// Solo los usuarios autenticados pueden actualizar un producto
productsRouter.put("/update/:id", requiresAuth(), updateProductServicesHandler);

// Solo los usuarios autenticados pueden eliminar un producto
productsRouter.delete(
  "/delete/:id",
  requiresAuth(),
  deleteProductServicesHandler
);

module.exports = productsRouter;
