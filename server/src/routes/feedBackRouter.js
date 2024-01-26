const { Router } = require("express");
const { createFeedBackHandler } = require("../handlers/feedBackHandlers");


const feedBackRouter = Router();

feedBackRouter.post("/", createFeedBackHandler);


module.exports = feedBackRouter;