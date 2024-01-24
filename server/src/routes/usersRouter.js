const { Router } = require("express");
const { createUserHandler } = require("../handlers/usersHandlers");

const usersRouter = Router();

usersRouter.post("/", createUserHandler);


module.exports = usersRouter;