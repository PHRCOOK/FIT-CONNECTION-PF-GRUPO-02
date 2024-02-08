const { Router } = require("express");
const { requiresAuth } = require("express-openid-connect");
const {
  createFeedBackHandler,
  getFeedBacksHandler,
} = require("../handlers/feedBackHandlers");

const feedBackRouter = Router();

// Solo los usuarios autenticados pueden crear retroalimentación
feedBackRouter.post("/", requiresAuth(), createFeedBackHandler);

// Solo los usuarios autenticados pueden obtener la retroalimentación
feedBackRouter.get("/", requiresAuth(), getFeedBacksHandler);

module.exports = feedBackRouter;
