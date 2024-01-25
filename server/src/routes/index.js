const { Router } = require('express');
const categoriesRoute = require('./ProductRoutes/categoryRoute.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/categorias', categoriesRoute); 
module.exports = router;
