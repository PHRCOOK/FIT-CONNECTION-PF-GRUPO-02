const { Router } = require("express");
const { requiresAuth } = require("express-openid-connect");
const {
  getGymHandler,
  postGymHandler,
  putGymHandler,
} = require("../handlers/gymHandler");

const gymRouter = Router();

// Solo los usuarios autenticados pueden obtener la información del gimnasio
gymRouter.get("/", requiresAuth(), getGymHandler);

// Solo los usuarios autenticados pueden crear un gimnasio
gymRouter.post("/", requiresAuth(), postGymHandler);

// Solo los usuarios autenticados pueden actualizar un gimnasio
gymRouter.put("/:id", requiresAuth(), putGymHandler);

module.exports = gymRouter;
