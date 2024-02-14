const { auth } = require('express-oauth2-jwt-bearer');

const jwtCheck = auth({
    audience: 'https://www.fitappconnection.cl', //api en auth0
    issuerBaseURL: 'https://dev-eqkkfue7vcj55cav.us.auth0.com/', //dominio,
    tokenSigningAlg: 'RS256' //el algoritmo para el token
  });
  
  module.exports = {
    jwtCheck
  }