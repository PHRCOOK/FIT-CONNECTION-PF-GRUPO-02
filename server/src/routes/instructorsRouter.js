const { Router } = require("express");
const {
  createInstructorHandler,
  updateInstructorHandler,
  getInstructorHandler,
  getInstructorByIDHandler,
} = require("../handlers/instructorHandlers");

const instructorRouter = Router();

instructorRouter.get("/", getInstructorHandler);
instructorRouter.get("/:id", getInstructorByIDHandler);
instructorRouter.post("/", createInstructorHandler);
instructorRouter.put("/:id", updateInstructorHandler);

module.exports = instructorRouter;
