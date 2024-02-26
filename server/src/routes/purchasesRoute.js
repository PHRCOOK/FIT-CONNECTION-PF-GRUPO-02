const { Router } = require('express');
const { /*postPurchasesController,*/ putPurchasesController } = require('../controllers/purchasesController');
 const { getPurchasesHandler } = require('../handlers/purchasesHandler')
const purchasesRouter = Router();
const { authorization } = require("../../utils/auth");
purchasesRouter.get('/', getPurchasesHandler);
//purchasesRouter.post('/', postPurchasesController);
purchasesRouter.put('/:id', authorization, putPurchasesController);

module.exports = purchasesRouter;
