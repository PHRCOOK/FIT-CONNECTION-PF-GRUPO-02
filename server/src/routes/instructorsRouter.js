const { Router } = require("express");
const {createInstructorHandler, updateInstructorHandler} = require("../handlers/instructorHandlers");


const instructorRouter = Router();


instructorRouter.post("/", createInstructorHandler);

instructorRouter.put("/:id", updateInstructorHandler);


module.exports = instructorRouter;