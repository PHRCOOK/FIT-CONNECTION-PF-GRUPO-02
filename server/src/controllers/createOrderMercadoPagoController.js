require("dotenv").config();
const { MercadoPagoConfig, Preference, Payment } = require('mercadopago');
const { TokenMP } = process.env;
const client = new MercadoPagoConfig({ accessToken: TokenMP });
const preference = new Preference(client);
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
                notification_url: "https://833f-201-188-177-32.ngrok-free.app/api/createorder/webhook"
            },
            requestOptions: { idempotencyKey: '63bf67c0d3947fadd5fdebc0032a5327131052e3118001bea21179bff84ddbe2' }
        })
        return createPayment
    } catch (error) {
        throw new Error(`${error.message}`);
    }
}

const receiveWebhook = async (req, res) => {
    const { data, type } =req.body
    try {
        if(type === "payment"){
            const payment = await new Payment(client).get({id:data.id})
            console.log(payment)
            return res.status(200).json(payment)
        }
    } catch (error) {
        return res.status(404).json({error:error.message})
    }
}
module.exports = {
    mercadoPaymentPreferences,
    receiveWebhook

}
/*
const mape = [
    {
        "id": 19,
        "name": "Pasta",
        "price": 50.10,
        "description": "Descripción del producto 1",
        "status": true,
        "code": "P002",
        "image_url": "https://ejemplo.com/imagen1.jpg",
        "stock": 70,
        "category_id": 1,
        "quantity": 10
    },
    {
        "id": 18,
        "name": "Arroz",
        "price": 19.99,
        "description": "Descripción del producto 1",
        "status": true,
        "code": "P001",
        "image_url": "https://ejemplo.com/imagen1.jpg",
        "stock": 70,
        "category_id": 1,
        "quantity": 10
    }
]
const userData = {
    name: 'Nombre del Usuario',
    email: 'usuario@example.com',
    area_code: '011',
    phone_number: '123456789',
    street: 'Calle Ejemplo',
    street_number: '123',
    zip_code: '1234',
  };
mercadoPayment(userData, mape);
*/