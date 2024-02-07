const { Router } = require("express");
const { createFeedBackHandler, getFeedBacksHandler } = require("../handlers/feedBackHandlers");


const feedBackRouter = Router();

feedBackRouter.post("/", createFeedBackHandler);

feedBackRouter.get('/', getFeedBacksHandler);


module.exports = feedBackRouter;