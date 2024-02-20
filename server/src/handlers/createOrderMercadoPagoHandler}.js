const { mercadoPaymentPreferences } = require('../controllers/createOrderMercadoPagoController')
const { getUserByIdController } = require('../controllers/usersControllers')
const { getShoppingCarts } = require('../controllers/shoppingCartControllers')

const mercadoPaymentPreferencesHandler = async (req, res) =>{
    try {
        console.log(req)
        const { id } = req.params
        //const userData = await getUserByIdController(user_id);
        const shoppingCart = await getShoppingCarts(id);
        const response = await mercadoPaymentPreferences(shoppingCart)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
module.exports ={
    mercadoPaymentPreferencesHandler
}