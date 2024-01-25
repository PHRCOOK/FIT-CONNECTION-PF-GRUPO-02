const { Router } = require('express');
const usersRouter = require('./usersRouter');
const categoriesRoute = require('./categoryRoute.js')
const router = Router();

// Definir rutas aquí:

router.use("/users", usersRouter)
router.use('/categorias', categoriesRoute); 

module.exports = router;
