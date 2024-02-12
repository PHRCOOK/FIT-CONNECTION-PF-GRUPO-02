const { Router } = require('express');
const { 
    createClientInfoHandler, 
    updateClientInfoHandler, 
    getClientInfoHandler 
} = require('../handlers/clientInfoHandler');


const clientInfoRouter = Router();


clientInfoRouter.post('/:user_id', createClientInfoHandler);

clientInfoRouter.put('/:user_id', updateClientInfoHandler);

clientInfoRouter.get('/:user_id', getClientInfoHandler);


module.exports = clientInfoRouter;