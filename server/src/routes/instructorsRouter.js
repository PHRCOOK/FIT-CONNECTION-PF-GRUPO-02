const { Router } = require("express");
const {
  createInstructorHandler,
  updateInstructorHandler,
  getInstructorHandler,
  getInstructorByIDHandler,
} = require("../handlers/instructorHandlers");
const { authorization } = require("../../utils/auth");
const upload = require("../services/multer");

const instructorRouter = Router();

instructorRouter.get("/", getInstructorHandler);
instructorRouter.get("/:id", getInstructorByIDHandler);
instructorRouter.post("/", authorization, upload.single('photo'), createInstructorHandler);
instructorRouter.put("/:id", authorization, updateInstructorHandler);

module.exports = instructorRouter;
