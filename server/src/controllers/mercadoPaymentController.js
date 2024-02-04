const { MercadoPagoConfig, Preference } =require('mercadopago');
const { INTEGER } = require('sequelize');
const client = new MercadoPagoConfig({ accessToken: 'TEST-4063707966079340-020216-0c3adbcfd3e8dc08a80ec9f41c78ae68-1666488094' });
const preference = new Preference(client);

const mercadoPayment = async(shoppingCard) => {
    try {
        const itemsArray = shoppingCard.map((producto, index) => {
            return {
                id: index + 1,  // Puedes usar un identificador único del producto aquí
                title: producto.name,
                quantity: producto.quantity,
                unit_price: Math.round(producto.price)
            };
        });
        //console.log(itemsArray)
        const createPayment = await preference.create({
            body: {
                items: itemsArray
            }
        })
       console.log(createPayment);
    } catch (error) {
        console.error(error);
    }
}
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
mercadoPayment(mape);