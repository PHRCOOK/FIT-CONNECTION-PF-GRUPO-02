const { Router } = require("express");
const createInstructorHandler = require("../handlers/createInstructorHandler");


const instructorRouter = Router();


instructorRouter.post("/", createInstructorHandler);


module.exports = instructorRouter;