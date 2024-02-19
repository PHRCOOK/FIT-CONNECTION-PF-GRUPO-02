const { Router } = require("express");
const {
  createUserHandler,
  getActiveUsersHandler,
  updateUserHandler,
  getInactiveUsersHandler,
  getDetailHandler,
  getUserByEmailHandler,
} = require("../handlers/usersHandlers");

const usersRouter = Router();

usersRouter.post("/", createUserHandler);

usersRouter.get("/", getActiveUsersHandler);

usersRouter.get("/inactive", getInactiveUsersHandler);

usersRouter.get("/:id", getDetailHandler);

usersRouter.get("/email/:email", getUserByEmailHandler);

usersRouter.put("/:id", updateUserHandler);


module.exports = usersRouter;
