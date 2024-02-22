const { Router } = require("express");
const {
  createInstructorHandler,
  updateInstructorHandler,
  getInstructorHandler,
  getInstructorByIDHandler,
} = require("../handlers/instructorHandlers");

const upload = require("../services/multer");

const instructorRouter = Router();

instructorRouter.get("/", getInstructorHandler);
instructorRouter.get("/:id", getInstructorByIDHandler);
instructorRouter.post("/", upload.single('photo'), createInstructorHandler);
instructorRouter.put("/:id", updateInstructorHandler);

module.exports = instructorRouter;
