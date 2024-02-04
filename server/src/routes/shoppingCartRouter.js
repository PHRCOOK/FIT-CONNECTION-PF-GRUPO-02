const { Router } = require("express");

const {
  createShoppingCartHandler,
  getShoppingCartsHandler,
  deleteShoppingCartsHandler,
} = require("../handlers/shoppingCartHandlers");

const shoppingCartRoutes = Router();

shoppingCartRoutes.post("/", createShoppingCartHandler);
shoppingCartRoutes.get("/:user_id", getShoppingCartsHandler);
shoppingCartRoutes.delete("/:user_id/:product_id", deleteShoppingCartsHandler);

module.exports = shoppingCartRoutes;
