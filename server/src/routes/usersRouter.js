const { Router } = require("express");
const {
  createUserHandler,
  getActiveUsersHandler,
  updateUserHandler,
  getInactiveUsersHandler,
  getDetailHandler,
  deleteUserControllerHandler,
} = require("../handlers/usersHandlers");
const { requiresAuth } = require("express-openid-connect");

const usersRouter = Router();

// Solo los usuarios autenticados pueden crear un usuario
usersRouter.post("/", requiresAuth(), createUserHandler);

// Solo los usuarios autenticados pueden obtener usuarios activos
usersRouter.get("/", requiresAuth(), getActiveUsersHandler);

// Solo los usuarios autenticados pueden obtener usuarios inactivos
usersRouter.get("/inactive", requiresAuth(), getInactiveUsersHandler);

// Solo los usuarios autenticados pueden obtener detalles de un usuario
usersRouter.get("/:id", requiresAuth(), getDetailHandler);

// Solo los usuarios autenticados pueden actualizar un usuario
usersRouter.put("/:id", requiresAuth(), updateUserHandler);

// Solo los usuarios autenticados pueden eliminar un usuario
usersRouter.delete("/:id", requiresAuth(), deleteUserControllerHandler);

module.exports = usersRouter;
