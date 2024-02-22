const { Router } = require("express");
const { createFeedBackHandler, getFeedBacksHandler, putFeedBackHandler } = require("../handlers/feedBackHandlers");


const feedBackRouter = Router();

feedBackRouter.post("/", createFeedBackHandler);

feedBackRouter.get('/', getFeedBacksHandler);

feedBackRouter.put('/:id', putFeedBackHandler);




module.exports = feedBackRouter;