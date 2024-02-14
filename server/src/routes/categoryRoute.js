const { Router } = require("express");
const {
  getAllCategoriesHandler,
  postCategoriesHandler,
  deleteCategoriesHandler,
  putCategoriesHandler,
} = require("../handlers/categoryHandler");
const categoryRouter = Router();
const { jwtCheck } = require('../../utils/auth')

categoryRouter.get("/", getAllCategoriesHandler);
categoryRouter.put("/:id", putCategoriesHandler);
categoryRouter.delete("/:id", deleteCategoriesHandler);
categoryRouter.post("/", jwtCheck, postCategoriesHandler);

module.exports = categoryRouter;
