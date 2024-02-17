const { Router } = require("express");
const {
  getAllCategoriesHandler,
  postCategoriesHandler,
  putCategoriesHandler,
} = require("../handlers/categoryHandler");
const categoryRouter = Router();
<<<<<<< HEAD
const { authorization } = require('../../utils/auth')

categoryRouter.get("/", authorization, getAllCategoriesHandler);
categoryRouter.put("/:id", authorization, putCategoriesHandler);
categoryRouter.delete("/:id", authorization, deleteCategoriesHandler);
categoryRouter.post("/", authorization, postCategoriesHandler);
=======
// const { jwtCheck } = require("../../utils/auth");

categoryRouter.get("/", getAllCategoriesHandler);
categoryRouter.put("/:id", putCategoriesHandler);
categoryRouter.post("/", postCategoriesHandler);
>>>>>>> a0d7b42f82db16dfd6f9e2f83e343eca7c019ee6

module.exports = categoryRouter;
