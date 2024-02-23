const { mercadoPaymentPreferences } = require('../controllers/createOrderMercadoPagoController');
const { getMembershipById } = require('../controllers/membershipController');
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
        const memberId = id
        const membership = await getMembershipById(id);
        const response = await buyMembershipControllerPreference(membership, userId, memberId)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
module.exports = {
    mercadoPaymentPreferencesHandler,
    membershipMercadopaymentPreferenceHandler
}