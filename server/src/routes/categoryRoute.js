const { Router } = require("express");
const {
  getAllCategoriesHandler,
  postCategoriesHandler,
  putCategoriesHandler,
} = require("../handlers/categoryHandler");
const categoryRouter = Router();
// const { jwtCheck } = require("../../utils/auth");

categoryRouter.get("/", getAllCategoriesHandler);
categoryRouter.put("/:id", putCategoriesHandler);
categoryRouter.post("/", postCategoriesHandler);

module.exports = categoryRouter;
