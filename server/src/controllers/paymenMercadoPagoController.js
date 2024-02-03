const { MercadoPagoConfig, Payment, mercadopago } = require('mercadopago');
const { getShoppingCarts } = require('../controllers/shoppingCartControllers')
const { MERCADOPAGO_KEY } = process.env;
const getCardToken = async () => {
    try {
        const cardData = {
            cardNumber: "4168 8188 4444 7115",
            cardholderName: 'OTHE',
            expirationMonth: 11,
            expirationYear: 25,
            securityCode: 123,
        };
        // Crea un objeto de tarjeta con los datos
        const card = await mercadopago.card.create(cardData);
        // Obtén el token de la tarjeta
        const cardToken = card.response.id;
        console.log('Token de Tarjeta:', cardToken);
        // Devuelve el token de la tarjeta
        return cardToken;
    } catch (error) {
        console.error('Error al obtener el token de tarjeta:', error);
    }
}
const preferencesMercadoPago = async (req, res) => {
    try {
        const tokenCard = await getCardToken();
        console.log(tokenCard)
        const client = new MercadoPagoConfig({ accessToken: MERCADOPAGO_KEY, options: { timeout: 5000, idempotencyKey: 'abc' } });
        const payment = new Payment(client);
        const body = {
            "additional_info": {
                "items": [
                    {
                        "id": "MLB2907679857",
                        "title": "Point Mini",
                        "description": "Point product for card payments via Bluetooth.",
                        "picture_url": "https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium2x.png",
                        "category_id": "electronics",
                        "quantity": 1,
                        "unit_price": 58.8,
                        "type": "electronics",
                        "event_date": "2023-12-31T09:37:52.000-04:00",
                        "warranty": false,
                        "category_descriptor": {
                            "passenger": {},
                            "route": {}
                        }
                    }
                ],
                "payer": {
                    "first_name": "Test",
                    "last_name": "Test",
                    "phone": {
                        "area_code": 11,
                        "number": "987654321"
                    },
                    "address": {
                        "street_number": null
                    }
                },
                "shipments": {
                    "receiver_address": {
                        "zip_code": "12312-123",
                        "state_name": "Rio de Janeiro",
                        "city_name": "Buzios",
                        "street_name": "Av das Nacoes Unidas",
                        "street_number": 3003
                    },
                }
            },
            "application_fee": null,
            "binary_mode": false,
            "campaign_id": null,
            "capture": false,
            "coupon_amount": null,
            "description": "Payment for product",
            "differential_pricing_id": null,
            "external_reference": "MP0001",
            "installments": 1,
            "metadata": null,
            "payer": {
                "entity_type": "individual",
                "type": "customer",
                "email": "test_user_123@testuser.com",
                "identification": {
                    "type": "CPF",
                    "number": "95749019047"
                }
            },
            "payment_method_id": "visa",
            "token": tokenCard,
            "transaction_amount": 58.8
        }
        const hola = await payment.create({ body })
        res.status(200).json(hola)
    } catch (error) {
        res.status(400).json({ error: error })
    }
}
module.exports = {
    preferencesMercadoPago
}