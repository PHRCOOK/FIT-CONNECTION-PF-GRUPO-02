const { Router } = require('express');
const { getAllCategoriesHandler,
    postCategoriesHandler,
    deleteCategoriesHandler,
    putCategoriesHandler } = require('../handlers/CategoryHandler');
const categoryRouter = Router();

categoryRouter.get('/', getAllCategoriesHandler);
categoryRouter.put('/:id', putCategoriesHandler);
categoryRouter.delete('/:id', deleteCategoriesHandler);
categoryRouter.post('/', postCategoriesHandler);

module.exports = categoryRouter;