const { Router } = require("express");

const {
  createShoppingCartHandler,
  getShoppingCartsHandler,
} = require("../handlers/shoppingCartHandlers");

const shoppingCartRoutes = Router();

shoppingCartRoutes.post("/", createShoppingCartHandler);
shoppingCartRoutes.get("/:user_id", getShoppingCartsHandler);

module.exports = shoppingCartRoutes;
