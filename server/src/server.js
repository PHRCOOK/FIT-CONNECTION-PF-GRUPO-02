const express = require("express");
const routes = require("./routes/index.js");
const cors = require("cors"); // Se agrega para que permita realizar las peticiones.
const morgan = require("morgan");
const { auth, requiresAuth } = require("express-openid-connect");

const server = express();

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use(express.json());
server.use(cors());
server.use(morgan("dev")); // Middlerware que nos permite visualizar los errores en la terminal.

// Configuración de Auth0
server.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
  })
);

server.use("/", routes);

module.exports = server;
