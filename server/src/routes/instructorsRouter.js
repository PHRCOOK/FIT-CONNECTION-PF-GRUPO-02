const { Router } = require("express");
const { requiresAuth } = require("express-openid-connect");
const {
  createInstructorHandler,
  updateInstructorHandler,
  getInstructorHandler,
  deleteInstructorsHandler,
} = require("../handlers/instructorHandlers");

const instructorRouter = Router();

// Solo los usuarios autenticados pueden obtener los instructores
instructorRouter.get("/", requiresAuth(), getInstructorHandler);

// Solo los usuarios autenticados pueden crear un instructor
instructorRouter.post("/", requiresAuth(), createInstructorHandler);

// Solo los usuarios autenticados pueden actualizar un instructor
instructorRouter.put("/:id", requiresAuth(), updateInstructorHandler);

// Solo los usuarios autenticados pueden eliminar un instructor
instructorRouter.delete(
  "/delete/:id",
  requiresAuth(),
  deleteInstructorsHandler
);

module.exports = instructorRouter;
