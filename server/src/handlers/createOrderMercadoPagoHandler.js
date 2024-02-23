const { mercadoPaymentPreferences } = require('../controllers/createOrderMercadoPagoController');
const { getMembershipPurchaseById } = require('../controllers/membershipPurchaseController');
const { getShoppingCarts } = require('../controllers/shoppingCartControllers');
const { buyMembershipControllerPreference } = require('../controllers/buyMembershipController');

const mercadoPaymentPreferencesHandler = async (req, res) => {
    const {userId} = req.body
    try {
        const shoppingCart = await getShoppingCarts(userId);
        const response = await mercadoPaymentPreferences(shoppingCart, userId)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
const membershipMercadopaymentPreferenceHandler = async (req, res) =>{
    const { id, userId } = req.body
    try {
        console.log(req.body)
        const membership = await getMembershipPurchaseById(id);
        const response = await buyMembershipControllerPreference(membership, userId)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
module.exports = {
    mercadoPaymentPreferencesHandler,
    membershipMercadopaymentPreferenceHandler
}