const { Router } = require("express");
const {
    mercadoPaymentPreferencesHandler
} = require("../handlers/createOrderMercadoPagoHandler");
const { receiveWebhook } = require('../controllers/createOrderMercadoPagoController')

const paymentRoute = Router();

paymentRoute.post("/", mercadoPaymentPreferencesHandler);
paymentRoute.get("/success", (req, res) => {
    const urlDestino = 'http://localhost:5173/#/product'
    res.redirect(302, urlDestino);
});
paymentRoute.get("/pending", (req, res) => res.json("pending"));
paymentRoute.get("/failure", (req, res) => {
    const urlDestino = 'http://localhost:5173/#/shopping'
    res.redirect(302, urlDestino);
});
paymentRoute.post("/webhook", receiveWebhook)

module.exports = paymentRoute;