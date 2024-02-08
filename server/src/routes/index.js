const express = require("express");
const { requiresAuth } = require("express-openid-connect");
const usersRouter = require("./usersRouter");
const instructorRouter = require("./instructorsRouter");
const feedBackRouter = require("./feedBackRouter");
const productsRouter = require("./productsRouter");
const categoryRouter = require("./categoryRoute");
const gymRoute = require("./gymRoute");
const purchaseRoute = require("./purchasesRoute");
const ShoppingCartRouter = require("./shoppingCartRouter");
const paymentRouter = require("./paymentRoute");
const router = express.Router();

// Definir rutas aquí:

router.use("/api/users", requiresAuth(), usersRouter);

router.use("/api/instructors", requiresAuth(), instructorRouter);

router.use("/api/feedbacks", requiresAuth(), feedBackRouter);

router.use("/api/products", requiresAuth(), productsRouter);

router.use("/api/categories", requiresAuth(), categoryRouter);

router.use("/api/purchases", requiresAuth(), purchaseRoute);

router.use("/api/gym", requiresAuth(), gymRoute);

router.use("/api/shoppingCart", requiresAuth(), ShoppingCartRouter);

router.use("/api/createorder", requiresAuth(), paymentRouter);

module.exports = router;
