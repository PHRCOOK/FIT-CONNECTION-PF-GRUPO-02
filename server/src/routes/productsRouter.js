const {Router} = require('express');

const { getProductServicesHandler, getProductServicesByIdHandler, getProductServicesByNameHandler, createProductServicesHandler, updateProductServicesHandler, deleteProductServicesHandler, filterByCategoryHandler, orderByPriceHandler
} = require('../handlers/productsHandlers');

const productsRouter = Router();

productsRouter.get('/', getProductServicesHandler);
productsRouter.get('/search', getProductServicesByNameHandler);
productsRouter.get("/price", orderByPriceHandler);
productsRouter.get('/:id', getProductServicesByIdHandler);
productsRouter.put('/:id', updateProductServicesHandler);
productsRouter.get("/category/:category_id", filterByCategoryHandler);
productsRouter.delete('/:id', deleteProductServicesHandler);
productsRouter.post('/', createProductServicesHandler);

module.exports = productsRouter;