const { Router } = require("express");
const { createFeedBackHandler, getFeedBacksHandler, putFeedBackHandler } = require("../handlers/feedBackHandlers");
const { authorization } = require("../../utils/auth");

const feedBackRouter = Router();

feedBackRouter.post("/", createFeedBackHandler);

feedBackRouter.get('/', getFeedBacksHandler);

feedBackRouter.put('/:id', authorization, putFeedBackHandler);




module.exports = feedBackRouter;
