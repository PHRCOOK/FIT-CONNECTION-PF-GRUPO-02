const { Router } = require("express");
const { requiresAuth } = require("express-openid-connect");

const {
  createShoppingCartHandler,
  getShoppingCartsHandler,
  deleteShoppingCartsHandler,
  deleteAllCartsHandler,
} = require("../handlers/shoppingCartHandlers");

const shoppingCartRoutes = Router();

// Solo los usuarios autenticados pueden crear un carrito de compras
shoppingCartRoutes.post("/", requiresAuth(), createShoppingCartHandler);

// Solo los usuarios autenticados pueden obtener sus carritos de compras
shoppingCartRoutes.get("/:user_id", requiresAuth(), getShoppingCartsHandler);

// Solo los usuarios autenticados pueden eliminar un producto de su carrito de compras
shoppingCartRoutes.delete(
  "/:user_id/:product_id",
  requiresAuth(),
  deleteShoppingCartsHandler
);

// Solo los usuarios autenticados pueden eliminar todos los productos de su carrito de compras
shoppingCartRoutes.delete("/:user_id", requiresAuth(), deleteAllCartsHandler);

module.exports = shoppingCartRoutes;
