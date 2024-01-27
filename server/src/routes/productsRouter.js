const {Router} = require('express');

const { getProductServicesHandler, getProductServicesByIdHandler, getProductServicesByNameHandler, createProductServicesHandler, updateProductServicesHandler, deleteProductServicesHandler, filterByCategoryHandler, orderByPriceHandler, productfilterHandler
} = require('../handlers/productsHandlers');

const productsRouter = Router();

// Rutas específicas primero
productsRouter.get('/filterByCategory/:category_id', filterByCategoryHandler);
productsRouter.get('/orderByPrice', orderByPriceHandler);
productsRouter.get('/productfilter', productfilterHandler);

// Rutas generales después
productsRouter.get('/', getProductServicesHandler);
productsRouter.get('/:id', getProductServicesByIdHandler);
productsRouter.get('/getByName', getProductServicesByNameHandler);
productsRouter.post('/create', createProductServicesHandler);
productsRouter.put('/update/:id', updateProductServicesHandler);
productsRouter.delete('/delete/:id', deleteProductServicesHandler);



module.exports = productsRouter;