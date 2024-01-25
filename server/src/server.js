const express = require("express");
const routes = require('./routes/index.js');
const cors = require("cors"); // Se agrega para que permita realizar las peticiones.
const morgan = require("morgan");


const server = express();

server.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Credentials', 'true');
   res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
   );
   res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, DELETE'
   );
   next();
});

server.use(express.json());
server.use(cors())
server.use(morgan("dev")) // Middlerware que nos permite visualizar los errores en la terminal.


server.use('/', routes);

<<<<<<< HEAD
module.exports = server;
=======
module.exports = server;
>>>>>>> e2726b55d6615857fb3ab047a2a4912bd9208f2f
