require("dotenv").config();
const { MercadoPagoConfig, Preference, Payment } = require('mercadopago');
const { TokenMP } = process.env;
const cliente = new MercadoPagoConfig({ accessToken: TokenMP });
const preferences = new Preference(cliente);
const { createMembershipPurchase } = require('./membershipPurchaseController')
const buyMembershipControllerPreference = async (membership, userId) =>{
    try {
        const createPayment = await preference.create({
            body: {
                auto_return: "approved",
                items: membership,
                back_urls: {
                    failure: "http://localhost:3001/api/createorder/failure", //hay que modificar dicha ruta
                    pending: "http://localhost:3001/api/createorder/pending",
                    success: "http://localhost:3001/api/createorder/success",
                },
                metadata: {
                    clientId:userId
                },
                //CAMBIAR EL "https://28f4-201-188-190-30.ngrok-free.app" POR EL URL DE LA API 
                //USAR LOS USERS DE PRUEBA 
                //Para pruebas en mi pc Use NGROK para dar a la local https!! y generar dicho enlace de abajo!! 
                notification_url: "https://71c3-201-188-190-38.ngrok-free.app/api/createorder/webhook"
            },
            requestOptions: { idempotencyKey: '63bf67c0d3947fadd5fdebc0032a5327131052e3118001bea21179bff84ddbe2' }
            // Elimina la línea user_id y pasa userId directamente como parte de las opciones del cuerpo
        });
        return createPayment;
    } catch (error) {
        throw new Error(`${error.message}`);
    }
}
const receiveWebhookM = async (req, res) => {
    const { data, type } = req.body
    try {
        if(type === "payment"){
            const payment = await new Payment(cliente).get({id:data.id})
            const {membership_id, payment_method, metadata } = payment;
            const {client_id} = metadata;
            const response = createMembershipPurchase(membership_id, payment_method, client_id);
            return res.status(200).json(response);
        }
    } catch (error) {
        return res.status(404).json({error:error.message})
    }
}
module.exports = {
    buyMembershipControllerPreference,
    receiveWebhookM
}