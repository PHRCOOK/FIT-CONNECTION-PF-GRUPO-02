const { Router } = require("express");
const {
  createInstructorHandler,
  updateInstructorHandler,
  getInstructorHandler,
  deleteInstructorsHandler,
} = require("../handlers/instructorHandlers");

const instructorRouter = Router();

instructorRouter.get("/", getInstructorHandler);
instructorRouter.post("/", createInstructorHandler);
instructorRouter.put("/:id", updateInstructorHandler);
instructorRouter.delete("/delete/:id", deleteInstructorsHandler);

module.exports = instructorRouter;
