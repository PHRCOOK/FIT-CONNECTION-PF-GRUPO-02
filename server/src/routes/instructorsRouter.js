const { Router } = require("express");
const {createInstructorHandler, updateInstructorHandler, getInstructorsHandler} = require("../handlers/instructorHandlers");


const instructorRouter = Router();


instructorRouter.post("/", createInstructorHandler);

instructorRouter.put("/:id", updateInstructorHandler);

instructorRouter.get('/', getInstructorsHandler);


module.exports = instructorRouter;