const { Router } = require('express');
const { postPurchasesController,
 } = require('../controllers/purchasesController');
 const { getPurchasesHandler } = require('../handlers/purchasesHandler')
const purchasesRouter = Router();

purchasesRouter.get('/', getPurchasesHandler);
purchasesRouter.post('/', postPurchasesController);
//router.post('/', postPurchasesDetails);

module.exports = purchasesRouter;