const {Router} = require('express');

const { 
    createMembershipPurchaseHandler, getMembershipPurchasesHandler, getMembershipPurchaseByIdHandler, getMembershipPurchasesByUserIdHandler, updateMembershipPurchaseHandler, deleteMembershipPurchaseHandler } = require('../handlers/membershipPurchaseHandler');

const membershipPurchaseRouter = Router();

membershipPurchaseRouter.get('/', getMembershipPurchasesHandler);
membershipPurchaseRouter.get('/:id', getMembershipPurchaseByIdHandler);
membershipPurchaseRouter.get('/user/:user_id', getMembershipPurchasesByUserIdHandler);
membershipPurchaseRouter.post('/', createMembershipPurchaseHandler);
membershipPurchaseRouter.put('/update/:id', updateMembershipPurchaseHandler);
membershipPurchaseRouter.delete('/:id', deleteMembershipPurchaseHandler);

module.exports = membershipPurchaseRouter;