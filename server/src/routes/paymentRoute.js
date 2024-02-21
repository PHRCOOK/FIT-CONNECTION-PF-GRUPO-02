const { Router } = require("express");
const {
    mercadoPaymentPreferencesHandler
} = require("../handlers/createOrderMercadoPagoHandler}");
const { receiveWebhook } = require('../controllers/createOrderMercadoPagoController')

const paymentRoute = Router();

paymentRoute.post("/", mercadoPaymentPreferencesHandler);
paymentRoute.get("/success", (req, res) => res.status(201).json("success"));
paymentRoute.get("/pending", (req, res) => res.json("pending"));
paymentRoute.get("/failure", (req, res) => res.json("failure"));
paymentRoute.post("/webhook", receiveWebhook)

module.exports = paymentRoute;