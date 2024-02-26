require("dotenv").config();
const { MercadoPagoConfig, Preference, Payment } = require("mercadopago");
const { TokenMP } = process.env;
const client = new MercadoPagoConfig({ accessToken: TokenMP });
const preference = new Preference(client);
const { postPurchasesFunction } = require("../controllers/purchasesController");
const mercadoPaymentPreferences = async (shoppingCard, userId) => {
  try {
    const itemsArray = shoppingCard.map((producto, index) => {
      return {
        id: index + 1,
        title: producto.name,
        quantity: producto.quantity,
        category_id: producto.category_id,
        description: producto.description,
        picture_url: producto.image_url,
        unit_price: Math.round(producto.price),
      };
    });
    const createPayment = await preference.create({
      body: {
        auto_return: "approved",
        items: itemsArray,
        back_urls: {
          failure:
            "https://fit-connection-pf-grupo-02-production.up.railway.app/api/createorder/failure", //hay que modificar dicha ruta
          pending:
            "https://fit-connection-pf-grupo-02-production.up.railway.app/api/createorder/pending",
          success:
            "https://fit-connection-pf-grupo-02-production.up.railway.app/api/createorder/success",
        },
        metadata: {
          clientId: userId,
        },
        //CAMBIAR EL "https://28f4-201-188-190-30.ngrok-free.app" POR EL URL DE LA API
        //USAR LOS USERS DE PRUEBA
        //Para pruebas en mi pc Use NGROK para dar a la local https!! y generar dicho enlace de abajo!!
        notification_url:
          "https://fit-connection-pf-grupo-02-production.up.railway.app/api/createorder/webhook",
      },
      requestOptions: {
        idempotencyKey:
          "63bf67c0d3947fadd5fdebc0032a5327131052e3118001bea21179bff84ddbe2",
      },
      // Elimina la línea user_id y pasa userId directamente como parte de las opciones del cuerpo
    });
    return createPayment;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

const receiveWebhook = async (req, res) => {
  const { data, type } = req.body;
  try {
    if (type === "payment") {
      const payment = await new Payment(client).get({ id: data.id });
      const { status, payment_type_id, date_approved, metadata } = payment;
      const { client_id } = metadata;
      const response = postPurchasesFunction(
        payment_type_id,
        date_approved,
        status,
        client_id
      );
      return res.status(200).json(response);
    }
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};
module.exports = {
  mercadoPaymentPreferences,
  receiveWebhook,
};
