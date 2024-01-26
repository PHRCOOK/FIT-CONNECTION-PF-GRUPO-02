const {Router} = require('express');

const { getProductServicesHandler, getProductServicesByIdHandler, getProductServicesByNameHandler, createProductServicesHandler, updateProductServicesHandler, deleteProductServicesHandler
} = require('../handlers/productsHandlers');

const productsRouter = Router();

productsRouter.get('/', getProductServicesHandler);
productsRouter.get('/:id', getProductServicesByIdHandler);
productsRouter.get('/search', getProductServicesByNameHandler);
productsRouter.put('/:id', updateProductServicesHandler);
productsRouter.delete('/:id', deleteProductServicesHandler);
productsRouter.post('/', createProductServicesHandler);

module.exports = productsRouter;