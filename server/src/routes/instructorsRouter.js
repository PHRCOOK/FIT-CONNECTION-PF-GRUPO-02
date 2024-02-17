const { Router } = require("express");
const {
  createInstructorHandler,
  updateInstructorHandler,
  getInstructorHandler,
} = require("../handlers/instructorHandlers");

const instructorRouter = Router();

instructorRouter.get("/", getInstructorHandler);
instructorRouter.post("/", createInstructorHandler);
instructorRouter.put("/:id", updateInstructorHandler);

module.exports = instructorRouter;