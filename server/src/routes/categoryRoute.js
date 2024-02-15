const { Router } = require("express");
const {
  getAllCategoriesHandler,
  postCategoriesHandler,
  deleteCategoriesHandler,
  putCategoriesHandler,
} = require("../handlers/categoryHandler");
const categoryRouter = Router();
const { authorization } = require('../../utils/auth')

categoryRouter.get("/", authorization, getAllCategoriesHandler);
categoryRouter.put("/:id", authorization, putCategoriesHandler);
categoryRouter.delete("/:id", authorization, deleteCategoriesHandler);
categoryRouter.post("/", authorization, postCategoriesHandler);

module.exports = categoryRouter;
