const { Router } = require('express');
const { postPurchasesController, putPurchasesController
 } = require('../controllers/purchasesController');
 const { getPurchasesHandler } = require('../handlers/purchasesHandler')
const purchasesRouter = Router();

purchasesRouter.get('/', getPurchasesHandler);
purchasesRouter.post('/', postPurchasesController);
purchasesRouter.put('/:id', putPurchasesController);

module.exports = purchasesRouter;