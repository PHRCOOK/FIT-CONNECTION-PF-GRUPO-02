require("dotenv").config();
const { MercadoPagoConfig, Preference, Payment } = require('mercadopago');
const { TokenMP } = process.env;
const cliente = new MercadoPagoConfig({ accessToken: TokenMP });
const preference = new Preference(cliente);
const { createMembershipPurchase } = require('./membershipPurchaseController')
const buyMembershipControllerPreference = async (membership, userId, memberId) =>{
    const membershipData = {
        id: membership.id,
        title: membership.name,
        quantity: 1,
        description: membership.description,
        picture_url: membership.image_url,
        unit_price: Math.round(membership.price)
    }
    const membershipArray = [membershipData];
    try {
        const createPayment = await preference.create({
            body: {
                auto_return: "approved",
                items: membershipArray,
                back_urls: {
                    failure: "https://fit-connection-pf-grupo-02-production.up.railway.app/api/membershipPurchases/go/failure", //hay que modificar dicha ruta
                    pending: "https://fit-connection-pf-grupo-02-production.up.railway.app/api/membershipPurchases/go/pending",
                    success: "https://fit-connection-pf-grupo-02-production.up.railway.app/api/membershipPurchases/go/success",
                },
                metadata: {
                    clientId:userId,
                    memberId:memberId
                },
                //CAMBIAR EL "https://28f4-201-188-190-30.ngrok-free.app" POR EL URL DE LA API 
                //USAR LOS USERS DE PRUEBA 
                //Para pruebas en mi pc Use NGROK para dar a la local https!! y generar dicho enlace de abajo!! 
                notification_url: "https://fit-connection-pf-grupo-02-production.up.railway.app/api/membershipPurchases/webhook"
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
            const {status, payment_method, metadata } = payment;
            const {client_id, member_id} = metadata;
            console.log(status)
            const response = createMembershipPurchase(client_id, member_id, payment_method.type, status);
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
