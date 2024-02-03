const { Router } = require('express');
const { getGymHandler,
    postGymHandler,
    putGymHandler,
 } = require('../handlers/gymHandler');
 const { preferencesMercadoPago } = require('../controllers/paymenMercadoPagoController')
const gymRouter = Router();

gymRouter.get('/', getGymHandler);
gymRouter.post('/', postGymHandler);
gymRouter.put('/:id', putGymHandler);
gymRouter.post('/pruebashop', preferencesMercadoPago)

module.exports = gymRouter;