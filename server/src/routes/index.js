const { Router } = require('express');
const usersRouter = require('./usersRouter');
const categoriesRoute = require('./categoryRoute.js')
const instructorRouter = require('./instructorsRouter');
const feedBackRouter = require('./feedBackRouter');
const router = Router();

// Definir rutas aquí:

router.use("/users", usersRouter)

router.use('/categorias', categoriesRoute); 

router.use("/instructors", instructorRouter);

router.use("/feedbacks", feedBackRouter);

module.exports = router;
