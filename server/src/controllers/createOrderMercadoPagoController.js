const { MercadoPagoConfig, Preference, Payment } = require('mercadopago');
const client = new MercadoPagoConfig({ accessToken: 'TEST-4476023510988060-020619-237b8bf2aabd81ac0fea5588f2b7091c-1672469458' });
const preference = new Preference(client);
const { postPurchasesFunction } = require('../controllers/purchasesController')
const mercadoPaymentPreferences = async (shoppingCard) => {
    try {
        const itemsArray = shoppingCard.map((producto, index) => {
            return {
                id: index + 1, 
                title: producto.name,
                quantity: producto.quantity,
                category_id: producto.category_id,
                description: producto.description,
                picture_url: producto.image_url,
                unit_price: Math.round(producto.price)
            };
        });
        const createPayment = await preference.create({
            body: {
                auto_return: "approved",
                items: itemsArray,
                back_urls: {
                    failure: "http://localhost:3001/api/createorder/failure", //hay que modificar dicha ruta
                    pending: "http://localhost:3001/api/createorder/pending",
                    success: "http://localhost:3001/api/createorder/success",
                },
                //CAMBIAR EL "https://28f4-201-188-190-30.ngrok-free.app" POR EL URL DE LA API 
                //USAR LOS USERS DE PRUEBA 
                //Para pruebas en mi pc Use NGROK para dar a la local https!! y generar dicho enlace de abajo!! 
                notification_url: "https://60f8-201-188-187-131.ngrok-free.app/api/createorder/webhook"

            },
            requestOptions: { idempotencyKey: '54b9a173d9eaf68a9b36a045397fcb4592808d875615f45a19d37a104a065b91' }
        })
        return createPayment
    } catch (error) {
        throw new Error(`${error.message}`);
    }
}

const receiveWebhook = async (req, res) => {
    const { data, type } = req.body
    try {
        if(type === "payment"){
            const payment = await new Payment(client).get({id:data.id})
            console.log(payment)
            const { status, payment_type_id, date_approved  } = payment
            const user_id = 1
            console.log(user_id, status, payment_type_id, date_approved)
            const response = postPurchasesFunction(payment_type_id, date_approved, status, user_id)
            return res.status(200).json(response)
        }
    } catch (error) {
        return res.status(404).json({error:error.message})
    }
}
module.exports = {
    mercadoPaymentPreferences,
    receiveWebhook

}