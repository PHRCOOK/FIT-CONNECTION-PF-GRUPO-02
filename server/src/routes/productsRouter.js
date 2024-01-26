const {Router} = require('express');

const { getProductServicesHandler, getProductServicesByIdHandler, getProductServicesByNameHandler, createProductServicesHandler, updateProductServicesHandler, deleteProductServicesHandler, filterByCategoryHandler, orderByPriceHandler
} = require('../handlers/productsHandlers');

const productsRouter = Router();

productsRouter.get('/', getProductServicesHandler);
productsRouter.get('/search', getProductServicesByNameHandler);
productsRouter.get('/:id', getProductServicesByIdHandler);
productsRouter.put('/:id', updateProductServicesHandler);
productsRouter.delete('/:id', deleteProductServicesHandler);
productsRouter.post('/', createProductServicesHandler);
productsRouter.get("/category/:category_id", filterByCategoryHandler);
productsRouter.get("/price", orderByPriceHandler);

module.exports = productsRouter;