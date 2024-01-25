const { Router } = require("express");
const { 
    createUserHandler, 
    getActiveUsersHandler,
    updateUserHandler,
    getInactiveUsersHandler,
    getDetailHandler

} = require("../handlers/usersHandlers");

const usersRouter = Router();

usersRouter.post("/", createUserHandler);

usersRouter.get("/", getActiveUsersHandler);

usersRouter.get("/inactive", getInactiveUsersHandler);

usersRouter.get("/:id", getDetailHandler);

usersRouter.put("/:id", updateUserHandler);


module.exports = usersRouter;