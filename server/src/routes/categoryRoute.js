const { Router } = require("express");
const {
  getAllCategoriesHandler,
  postCategoriesHandler,
  putCategoriesHandler,
} = require("../handlers/categoryHandler");
const categoryRouter = Router();
const { authorization } = require('../../utils/auth')

categoryRouter.get("/", authorization, getAllCategoriesHandler);
categoryRouter.put("/:id", authorization, putCategoriesHandler);
categoryRouter.post("/", authorization, postCategoriesHandler);

module.exports = categoryRouter;
