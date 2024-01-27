const { Router } = require("express");

const {
  createShoppingCartHandler,
} = require("../handlers/shoppingCartHandlers");

const shoppingCartRoutes = Router();

shoppingCartRoutes.post("/", createShoppingCartHandler);

module.exports = shoppingCartRoutes;
