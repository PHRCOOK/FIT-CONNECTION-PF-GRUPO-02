const { MercadoPagoConfig, Preference, Payment } = require('mercadopago');
const client = new MercadoPagoConfig({ accessToken: 'TEST-4063707966079340-020216-0c3adbcfd3e8dc08a80ec9f41c78ae68-1666488094' });
const preference = new Preference(client);
const { postPurchasesFunction } = require('../controllers/purchasesController')
const mercadoPaymentPreferences = async (userData, shoppingCard) => {
    try {
        const itemsArray = shoppingCard.map((producto, index) => {
            return {
                id: index + 1,  // Puedes usar un identificador único del producto aquí
                title: producto.name,
                quantity: producto.quantity,
                category_id: producto.category_id,
                description: producto.description,
                picture_url: producto.image_url,
                unit_price: Math.round(producto.price)
            };
        });
        const payer = {
            name: userData.fullname,
            email: userData.email,
        };
        const createPayment = await preference.create({
            body: {
                items: itemsArray,
                payer: payer,
                back_urls: {
                    failure: "http://localhost:3001/api/createorder/failure",
                    pending: "http://localhost:3001/api/createorder/pending",
                    success: "http://localhost:3001/api/createorder/success",
                },
                notification_url: "https://60f7-201-188-177-32.ngrok-free.app/api/createorder/webhook"
            },
            requestOptions: { idempotencyKey: '63bf67c0d3947fadd5fdebc0032a5327131052e3118001bea21179bff84ddbe2' }
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