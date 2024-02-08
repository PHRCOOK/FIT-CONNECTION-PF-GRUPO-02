const { Router } = require("express");
const { requiresAuth } = require("express-openid-connect");
const {
  /*postPurchasesController,*/ putPurchasesController,
} = require("../controllers/purchasesController");
const { getPurchasesHandler } = require("../handlers/purchasesHandler");

const purchasesRouter = Router();

// Solo los usuarios autenticados pueden obtener las compras
purchasesRouter.get("/", requiresAuth(), getPurchasesHandler);

// Solo los usuarios autenticados pueden actualizar las compras
purchasesRouter.put("/:id", requiresAuth(), putPurchasesController);

module.exports = purchasesRouter;
