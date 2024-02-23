const { Router } = require('express');

const {
    createMembershipPurchaseHandler, getMembershipPurchasesHandler, getMembershipPurchaseByIdHandler, getMembershipPurchasesByUserIdHandler, updateMembershipPurchaseHandler, deleteMembershipPurchaseHandler
} = require('../handlers/membershipPurchaseHandler');

const membershipPurchaseRouter = Router();
const { membershipMercadopaymentPreferenceHandler } = require('../handlers/createOrderMercadoPagoHandler')
const { receiveWebhookM } = require('../controllers/buyMembershipController')

membershipPurchaseRouter.get('/', getMembershipPurchasesHandler);
membershipPurchaseRouter.get('/:id', getMembershipPurchaseByIdHandler);
membershipPurchaseRouter.get('/user/:user_id', getMembershipPurchasesByUserIdHandler);
membershipPurchaseRouter.post('/', createMembershipPurchaseHandler);
membershipPurchaseRouter.put('/update/:id', updateMembershipPurchaseHandler);
membershipPurchaseRouter.delete('/:id', deleteMembershipPurchaseHandler);

//purchase
membershipPurchaseRouter.post('/checkout', membershipMercadopaymentPreferenceHandler);
membershipPurchaseRouter.get("/success", (req, res) => {
    const urlDestino = 'http://localhost:5173/#/services'
    res.redirect(302, urlDestino);
});
membershipPurchaseRouter.get("/pending", (req, res) => res.json("pending"));
membershipPurchaseRouter.get("/failure", (req, res) => {
    const urlDestino = 'http://localhost:5173/#/services'
    res.redirect(302, urlDestino);
});
membershipPurchaseRouter.post("/webhook", receiveWebhookM)

module.exports = membershipPurchaseRouter;